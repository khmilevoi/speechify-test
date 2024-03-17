import { memo } from "react";

import { TextPlugItemDTO } from "@/shared/api/text-plug/types.ts";

import * as styles from "./styles.module.css";

export type PlugItemProps = {
  plug: TextPlugItemDTO;
};

export const PlugItem = memo(({ plug }: PlugItemProps) => {
  switch (plug.type) {
    case "header":
      return <h1 className={styles.header}>{plug.content}</h1>;
    case "paragraph":
      return <p className={styles.paragraph}>{plug.content}</p>;
    case "quote":
      return <blockquote className={styles.quote}>{plug.content}</blockquote>;
  }
});
