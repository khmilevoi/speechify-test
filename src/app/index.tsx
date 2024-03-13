import "./index.css";

import { FunctionComponent } from "react";

import { ReaderPage } from "@/pages/reader";

import * as styles from "./styles.module.css";

export const App: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <ReaderPage.Layout />
    </div>
  );
};
