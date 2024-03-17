import { useSyncExternalStore } from "react";

import { Atom } from "../atom";

export const useAtom = <T>(atom: Atom<T>) => {
  return useSyncExternalStore(atom.on, atom);
};
