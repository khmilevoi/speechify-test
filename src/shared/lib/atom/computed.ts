import { Atom, atom } from "./atom.ts";

export const computed = <T>(fn: () => T): Atom<T> => {
  atom._listen();
  const init = fn();
  const deps = atom._stop();

  const computedAtom = atom<T>(init);

  deps.forEach((dep) => {
    if (dep === computedAtom) {
      throw new Error("circular dependency");
    }

    dep.on(() => {
      computedAtom.set(fn());
    });
  });

  return computedAtom;
};
