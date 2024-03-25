import {
  FunctionComponent,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { createModel } from "@/features/reader/model.ts";
import { useAtom } from "@/shared/lib/atom/react";
import * as styles from "./styles.module.css";

export type ReaderProps = {
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export const Reader = memo(({ contentRef }: ReaderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const model = useMemo(() => {
    return createModel();
  }, []);

  const isLoading = useAtom(model.$isLoading);
  const isPlaying = useAtom(model.$isPlaying);

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

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className={`${styles.container} ${isLoading ? styles.loading : ""}`}>
      <audio ref={audioRef} src={url} controls hidden></audio>

      <div className={styles.controls}>
        <div>
          <Loader></Loader>
          <Play
            isPlaying={isPlaying}
            onClick={() => model.$isPlaying.set(!isPlaying)}
          />
        </div>
      </div>
    </div>
  );
});

const Play: FunctionComponent<{ isPlaying: boolean; onClick: () => void }> = ({
  isPlaying,
  onClick,
}) => {
  return (
    <button
      className={`${styles.play} ${isPlaying ? styles.playing : ""}`}
      onClick={onClick}
    >
      {">"}
    </button>
  );
};

const Loader = () => {
  return (
    <svg
      className={styles.loader}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xml:space="preserve"
    >
      <path
        fill="#fff"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
