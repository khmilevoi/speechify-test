import { effect } from "@/shared/lib/atom";
import { sleep } from "@/shared/lib/sleep.ts";

export const speechApi = {
  get: async (signal: AbortSignal, input: string) => {
    await sleep(5000, signal);

    return fetch("/speech-to-text", {
      method: "POST",
      body: JSON.stringify(input),
      signal,
    }).then((res) => res.blob());
  },
};

export const speechService = {
  get: effect(({ signal }, input: string) => speechApi.get(signal, input)),
};
