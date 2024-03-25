import { createReader } from "@/entities/reader";
import { createSpeech } from "@/entities/speech";
import { atom, computed } from "@/shared/lib/atom";

export const createModel = () => {
  const reader = createReader();
  const speech = createSpeech();

  reader.$nodes.on((nodes) => {
    if (nodes) {
      speech.$nodes.set(nodes);
    }
  });

  const $isLoading = computed(() => reader.$isParsing() || speech.$isLoading());

  const $isPlaying = atom(false);

  return {
    reader,
    speech,
    $isLoading,
    $isPlaying,
  };
};
