export type Event<Result, Args extends unknown[]> = {
  (...args: Args): Result;
  onCall(cb: CallListener<Result, Args>): () => void;
};

export type CallListener<Result, Args extends unknown[]> = (
  result: Result,
  args: Args,
) => void;

export const event = <Result, Args extends unknown[]>(
  cb: (...args: Args) => Result,
): Event<Result, Args> => {
  const listeners = new Set<CallListener<Result, Args>>();

  const caller = (...args: Args) => {
    const result = cb(...args);

    listeners.forEach((listener) => listener(result, args));

    return result;
  };

  caller.onCall = (cb: CallListener<Result, Args>) => {
    listeners.add(cb);

    return () => listeners.delete(cb);
  };

  return caller;
};
