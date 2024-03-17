import "./index.css";

import { FunctionComponent, useRef } from "react";

import { MainPage } from "@/pages/main";
import { Reader } from "@/features/reader";

import * as styles from "./styles.module.css";

export const App: FunctionComponent = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.container}>
      <MainPage.Layout ref={contentRef} />
      <Reader contentRef={contentRef} />
    </div>
  );
};
