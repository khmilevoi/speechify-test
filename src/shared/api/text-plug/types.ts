export type TextPlugDTO = TextPlugItemDTO[];

export type TextPlugItemDTO = {
  type: "paragraph" | "header" | "quote";
  content: string;
};
