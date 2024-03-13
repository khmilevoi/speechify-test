export type Event<Result, Args extends unknown[]> = {
  (...args: Args): Result;
  onCall(cb: CallListener<Args>): () => void;
};

export type CallListener<Args extends unknown[]> = (...args: Args) => void;

export const event = <Result, Args extends unknown[]>(
  cb: (...args: Args) => Result,
): Event<Result, Args> => {
  const listeners = new Set<CallListener<Args>>();

  const caller = (...args: Args) => {
    return cb(...args);
  };

  caller.onCall = (cb: CallListener<Args>) => {
    listeners.add(cb);

    return () => listeners.delete(cb);
  };

  return caller;
};
