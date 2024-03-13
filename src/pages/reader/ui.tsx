import { FunctionComponent } from "react";

import { useAtom, useSideEffect } from "@/shared/lib/atom/react";

import {
  $double,
  $num,
  $num2,
  asyncDecrement,
  asyncIncrement,
  reset,
  syncDecrement,
  syncIncrement,
} from "./model.ts";
import * as styles from "./styles.module.css";

export const Layout: FunctionComponent = () => {
  return (
    <div className={styles["container"]}>
      <button onClick={reset} className={styles["reset"]}>
        Reset
      </button>
      <Input />
      <Num />
      <Double />
      <Increment />
      <Decrement />
    </div>
  );
};

const Input = () => {
  const [num2, setNum2] = useAtom($num2);

  return (
    <div className={styles["inputContainer"]}>
      <h2 className={styles["inputContainer__title"]}>Input</h2>
      <input
        className={styles["input"]}
        value={num2}
        onChange={(e) => setNum2(parseInt(e.target.value, 10))}
      />
    </div>
  );
};

const Num = () => {
  const [num] = useAtom($num);

  return (
    <div className={styles["numContainer"]}>
      <h2 className={styles["numContainer__title"]}>Num</h2>
      <div className={styles["num"]}>num: {num}</div>
    </div>
  );
};

const Double = () => {
  const [double] = useAtom($double);

  return (
    <div className={styles["doubleContainer"]}>
      <h2 className={styles["doubleContainer__title"]}>Double</h2>
      <div className={styles["double"]}>double: {double}</div>
    </div>
  );
};

const Increment = () => {
  return (
    <div className={styles["incrementContainer"]}>
      <h2 className={styles["incrementContainer__title"]}>Increment</h2>
      <button onClick={syncIncrement} className={styles["increment"]}>
        Increment
      </button>
      <AsyncIncrement />
    </div>
  );
};

const AsyncIncrement = () => {
  const [incrementEffect, { isError, error, isSuccess, data, isLoading }] =
    useSideEffect(asyncIncrement);

  return (
    <div className={styles["asyncIncrementContainer"]}>
      <h2 className={styles["asyncIncrementContainer__title"]}>
        Async Increment
      </h2>
      <button
        onClick={incrementEffect}
        className={`${styles["asyncIncrementContainer__button"]} ${
          isError
            ? styles["asyncIncrementContainer__button__error"]
            : isSuccess
              ? styles["asyncIncrementContainer__button__success"]
              : ""
        }`}
      >
        Async Increment
      </button>
      <div
        className={`${styles["asyncIncrementContainer__loading"]} ${isLoading ? styles["asyncIncrementContainer__loading__active"] : ""}`}
      >
        Loading...
      </div>
      <div
        className={`${styles["asyncIncrementContainer__error"]} ${isError ? styles["asyncIncrementContainer__error__active"] : ""}`}
      >
        Error: {error?.message}
      </div>
      <div
        className={`${styles["asyncIncrementContainer__success"]} ${isSuccess ? styles["asyncIncrementContainer__success__active"] : ""}`}
      >
        Success: {JSON.stringify(data)}
      </div>
    </div>
  );
};

const Decrement = () => {
  return (
    <div className={styles["decrementContainer"]}>
      <h2 className={styles["decrementContainer__title"]}>Decrement</h2>
      <button onClick={syncDecrement} className={styles["decrement"]}>
        Decrement
      </button>
      <AsyncDecrement />
    </div>
  );
};

const AsyncDecrement = () => {
  const [decrementEffect, { isError, error, isSuccess, data, isLoading }] =
    useSideEffect(asyncDecrement);

  return (
    <div className={styles["asyncDecrementContainer"]}>
      <h2 className={styles["asyncDecrementContainer__title"]}>
        Async Decrement
      </h2>
      <button
        onClick={decrementEffect}
        className={`${styles["asyncDecrementContainer__button"]} ${
          isError
            ? styles["asyncDecrementContainer__button__error"]
            : isSuccess
              ? styles["asyncDecrementContainer__button__success"]
              : ""
        }`}
      >
        Async Decrement
      </button>
      <div
        className={`${styles["asyncDecrementContainer__loading"]} ${isLoading ? styles["asyncDecrementContainer__loading__active"] : ""}`}
      >
        Loading...
      </div>
      <div
        className={`${styles["asyncDecrementContainer__error"]} ${isError ? styles["asyncDecrementContainer__error__active"] : ""}`}
      >
        Error: {error?.message}
      </div>
      <div
        className={`${styles["asyncDecrementContainer__success"]} ${isSuccess ? styles["asyncDecrementContainer__success__active"] : ""}`}
      >
        Success: {JSON.stringify(data)}
      </div>
    </div>
  );
};
