import { effect } from "@/shared/lib/atom";
import { sleep } from "@/shared/lib/sleep.ts";

import { textPlugMock } from "./mocks.ts";

export const textPlugApi = {
  get: async (signal: AbortSignal) => {
    await sleep(1000, signal);

    return textPlugMock;
  },
};

export const textPlugService = {
  get: effect(async ({ signal }) => {
    return await textPlugApi.get(signal);
  }),
};
