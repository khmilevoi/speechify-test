import { ReaderNode } from "./types.ts";

export const parseDOM = async (
  container: HTMLDivElement,
  signal: AbortSignal,
): Promise<ReaderNode[]> => {
  const result: (ReaderNode | Promise<ReaderNode[]>)[] = [];

  const children = container.children;

  for (const child of children) {
    if (child instanceof HTMLParagraphElement) {
      result.push({
        type: "paragraph",
        content: child.innerText,
      });
    } else if (child instanceof HTMLHeadingElement) {
      result.push({
        type: "heading",
        content: child.innerText,
      });
    } else if (child instanceof HTMLDivElement) {
      result.push(parseDOM(child, signal));
    } else {
      result.push({
        type: "unknown",
        content: child.textContent || "",
      });
    }
  }

  const parsed = await Promise.all(result);

  return parsed.flat();
};
