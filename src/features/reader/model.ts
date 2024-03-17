import { createReader } from "@/entities/reader";
import { createSpeech } from "@/entities/speech";

export const createModel = () => {
  const reader = createReader();
  const speech = createSpeech();

  reader.$nodes.on((nodes) => {
    if (nodes) {
      speech.$nodes.set(nodes);
    }
  });

  return {
    reader,
    speech,
  };
};
