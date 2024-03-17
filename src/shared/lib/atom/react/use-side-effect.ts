import { Effect } from "../effect.ts";
import { useAtom } from "./use-atom.ts";

export const useSideEffect = <Result, Args extends unknown[]>(
  effect: Effect<Result, Args>,
) => {
  const isLoading = useAtom(effect.$isLoading);
  const error = useAtom(effect.$error);
  const data = useAtom(effect.$data);

  return { isLoading, error, data, isError: !!error, isSuccess: !!data };
};
