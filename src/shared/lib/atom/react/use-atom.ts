import { useSyncExternalStore } from "react";

import { Atom } from "../atom";

export const useAtom = <T>(atom: Atom<T>) => {
  const data = useSyncExternalStore(atom.on, atom);

  return [data, atom.set] as const;
};
