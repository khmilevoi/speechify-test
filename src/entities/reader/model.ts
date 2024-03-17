import { atom, computed, effect } from "@/shared/lib/atom";
import { parseDOM } from "./parse-dom.ts";

export const createReader = () => {
  const $container = atom<HTMLDivElement | null>(null);

  const parseEffect = effect(async ({ signal }, container: HTMLDivElement) => {
    return await parseDOM(container, signal);
  });

  const $isParsing = parseEffect.$isLoading;
  const $nodes = parseEffect.$data;

  const observed = new WeakSet<HTMLDivElement>();

  const $observer = computed(() => {
    const container = $container();

    if (container === null) {
      return null;
    }

    return new MutationObserver(() => {
      return parseEffect(container);
    });
  });

  $container.on((container) => {
    const observer = $observer();

    if (observer === null || container === null) {
      return;
    }

    if (observed.has(container)) {
      return;
    }

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    observed.add(container);
  });

  return {
    $container,
    $isParsing,
    $nodes,
  };
};
