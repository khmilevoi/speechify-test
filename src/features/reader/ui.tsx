import { memo, useLayoutEffect, useMemo } from "react";
import { createModel } from "@/features/reader/model.ts";
import { useAtom } from "@/shared/lib/atom/react";

export type ReaderProps = {
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export const Reader = memo(({ contentRef }: ReaderProps) => {
  const model = useMemo(() => {
    return createModel();
  }, []);

  useLayoutEffect(() => {
    model.reader.$container.set(contentRef.current);
  }, [contentRef, model]);

  const data = useAtom(model.speech.$audio);

  const url = useMemo(() => {
    if (data) {
      return URL.createObjectURL(data);
    }

    return "";
  }, [data]);

  return (
    <div>
      <audio src={url} controls></audio>
    </div>
  );
});
