export type Atom<T> = {
  (): T;
  set(next: T): void;
  on(cb: AtomListener<T>): () => void;
};

export type AtomListener<T> = (next: T, prev: T) => void;

export const atom = <T>(init: T): Atom<T> => {
  const listeners = new Set<AtomListener<T>>();

  let current = init;

  const getter = () => {
    if (isListening) {
      targets.add(getter);
    }

    return current;
  };

  getter.set = (next: T) => {
    const prev = current;

    current = next;

    listeners.forEach((cb) => cb(next, prev));

    return next;
  };

  getter.on = (cb: AtomListener<T>) => {
    listeners.add(cb);

    return () => listeners.delete(cb);
  };

  return getter;
};

let isListening = false;
const targets = new Set<Atom<unknown>>();

atom._listen = () => {
  isListening = true;
};

atom._stop = () => {
  const result = [...targets];
  targets.clear();
  isListening = false;
  return result;
};
