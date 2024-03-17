export type Atom<T> = {
  (): T;
  set(next: T): void;
  on(cb: AtomListener<T>): () => void;
};

export type AtomListener<T> = (next: T, prev: T) => void;

export type AtomConfig<T> = {
  comparator?: (prev: T, next: T) => boolean;
};

const defaultComparator = <T>(prev: T, next: T) => prev === next;

export const atom = <T>(init: T, config?: AtomConfig<T>): Atom<T> => {
  const comparator = config?.comparator ?? defaultComparator;

  const listeners = new Set<AtomListener<T>>();

  let current = init;

  const getter = () => {
    if (isListening) {
      targets.add(getter);
    }

    return current;
  };

  getter.set = (next: T) => {
    if (comparator(current, next)) {
      return current;
    }

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
