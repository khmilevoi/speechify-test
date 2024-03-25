import { ReaderNode } from "@/entities/reader";
import { SpeechApi } from "@/shared/api/speech";
import { atom, computed } from "@/shared/lib/atom";
import { prepareSpeech } from "./prepare-speech.ts";

export const createSpeech = () => {
  const $nodes = atom<ReaderNode[]>([]);

  const $speechText = computed(() => {
    const nodes = $nodes();

    if (nodes.length === 0) {
      return "";
    }

    return prepareSpeech(nodes);
  });

  $speechText.on((speechText) => {
    if (speechText.trim().length === 0) {
      return null;
    }

    SpeechApi.service.get(speechText);
  });

  const $isLoading = SpeechApi.service.get.$isLoading;
  const $audio = SpeechApi.service.get.$data;

  return {
    $nodes,
    $isLoading,
    $audio,
  };
};
