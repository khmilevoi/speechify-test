import { useCallback, useRef } from "react";

export const useEvent = <Fun extends (...args: unknown[]) => unknown>(
  fun: Fun,
): Fun => {
  const funRef = useRef(fun);
  funRef.current = fun;

  return useCallback((...args: Parameters<Fun>) => {
    return funRef.current(...args);
  }, []) as Fun;
};
