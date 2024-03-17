import { forwardRef, memo } from "react";

import { PlugItem } from "@/pages/main/components/plug-item";
import { TextPlugApi } from "@/shared/api/text-plug";
import { useSideEffect } from "@/shared/lib/atom/react";

import * as styles from "./styles.module.css";

TextPlugApi.service.get();

export const Layout = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.textContainer}>
        <TextContent />
      </div>
    </div>
  );
});

const TextContent = memo(() => {
  const { data: plugs, isLoading } = useSideEffect(TextPlugApi.service.get);

  if (isLoading || !plugs) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {plugs.map((plug, index) => {
        return <PlugItem key={index} plug={plug} />;
      })}
    </>
  );
});
