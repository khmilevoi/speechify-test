import { ReaderNode } from "@/entities/reader";

export const prepareSpeech = (nodes: ReaderNode[]) => {
  return `<speech>${nodes.map(stringifyNode).join("")}</speech>`;
};

export const stringifyNode = (node: ReaderNode) => {
  switch (node.type) {
    case "paragraph":
      return `<p>${stringifySentence(node.content)}</p>`;
    case "heading":
      return `<p>${stringifySentence(node.content)}</p><break time="200ms"/>`;
    case "unknown":
      return `${stringifySentence(node.content)}`;
  }
};

const stringifySentence = (sentence: string) => {
  const matches = sentence.matchAll(/(.*[.,?!]?)/g);

  let result = "";

  for (const match of matches) {
    const sentence = match[0];

    switch (sentence[sentence.length - 1]) {
      case ".":
        result += `<s>${escape(sentence)}</s>`;
        break;
      case ",":
        result += `${escape(sentence)}<break time="200ms"/>`;
        break;
      case "!":
        result += `<s>${escape(sentence)}</s>`;
        break;
      case "?":
        result += `<s>${escape(sentence)}</s>`;
        break;
      default:
        result += escape(sentence);
    }
  }

  return result;
};

const escape = (string: string) => {
  return string.replace(/["&'<>]/, (substring) => {
    switch (substring) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return substring;
    }
  });
};
