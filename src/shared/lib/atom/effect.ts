import { Atom, atom } from "./atom.ts";

export type Effect<Result, Args extends unknown[]> = {
  (...args: Args): Promise<Result>;
  onCall(cb: CallEffectListener<Args>): () => void;
  onError(cb: ErrorEffectListener): () => void;
  onDone(cb: DoneEffectListener<Result>): () => void;
  abort: () => void;
  $isLoading: Atom<boolean>;
  $error: Atom<Error | null>;
  $data: Atom<Result | null>;
  $pending: Atom<number>;
};

export type CallEffectListener<Args extends unknown[]> = (
  ...args: Args
) => void;
export type ErrorEffectListener = (error: Error) => void;
export type DoneEffectListener<Result> = (result: Result) => void;

export type EffectApi<Result, Args extends unknown[]> = {
  signal: AbortSignal;
  args: Args;
  prevData: Result | null;
};

export const effect = <Result, Args extends unknown[]>(
  cb: (api: EffectApi<Result, Args>) => Promise<Result>,
): Effect<Result, Args> => {
  const $isLoading = atom(false);
  const $error = atom<Error | null>(null);
  const $data = atom<Result | null>(null);
  const $pending = atom(0);

  const listeners = {
    call: new Set<CallEffectListener<Args>>(),
    error: new Set<ErrorEffectListener>(),
    done: new Set<DoneEffectListener<Result>>(),
  };

  let abortController: AbortController | null = null;

  const caller = async (...args: Args) => {
    if (abortController) {
      abortController.abort();
    }

    const _abortController = new AbortController();

    abortController = _abortController;

    listeners.call.forEach((listener) => listener(...args));

    try {
      $pending.set($pending() + 1);
      $isLoading.set(true);
      $error.set(null);

      const effectApi: EffectApi<Result, Args> = {
        signal: _abortController.signal,
        args,
        prevData: $data(),
      };

      const result = await cb(effectApi);

      $data.set(result);
      $isLoading.set(false);

      listeners.done.forEach((listener) => listener(result));
    } catch (error) {
      if (_abortController === abortController) {
        $isLoading.set(false);
      }

      let effectError!: Error;

      if (error instanceof Error) {
        effectError = error;
      } else {
        effectError = new Error(`${error}`);
      }

      if (_abortController.signal.aborted) {
        return;
      }

      $error.set(effectError);
      listeners.error.forEach((listener) => listener(effectError));
    } finally {
      $pending.set($pending() - 1);
    }

    return $data();
  };

  caller.onCall = (cb: CallEffectListener<Args>) => {
    listeners.call.add(cb);

    return () => listeners.call.delete(cb);
  };

  caller.onError = (cb: ErrorEffectListener) => {
    listeners.error.add(cb);

    return () => listeners.error.delete(cb);
  };

  caller.onDone = (cb: DoneEffectListener<Result>) => {
    listeners.done.add(cb);

    return () => listeners.done.delete(cb);
  };

  caller.abort = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  caller.$isLoading = $isLoading;
  caller.$error = $error;
  caller.$data = $data;
  caller.$pending = $pending;

  return caller;
};
