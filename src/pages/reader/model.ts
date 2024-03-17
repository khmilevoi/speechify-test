import { atom, computed, effect, event } from "@/shared/lib/atom";
import { sleep } from "@/shared/lib/sleep.ts";

export const $num = atom(0);

export const $num2 = atom(10);

export const $double = computed(() => {
  return $num() * $num() + $num2() * $num2();
});

const increment = event(() => {
  $num.set($num() + 1);
});

const decrement = event(() => {
  $num.set($num() - 1);
});
export const syncIncrement = event(() => {
  asyncIncrement.abort();

  increment();
});

export const syncDecrement = event(() => {
  asyncDecrement.abort();

  decrement();
});

export const asyncIncrement = effect(async ({ signal }) => {
  asyncDecrement.abort();

  await sleep(2000, signal);

  increment();

  return `Incremented to ${$num()}`;
});

export const asyncDecrement = effect(async ({ signal }) => {
  asyncIncrement.abort();

  await sleep(2000, signal);

  decrement();

  return `Decremented to ${$num()}`;
});

export const reset = event(() => {
  $num.set(0);
  $num2.set(0);
  asyncDecrement.abort();
  asyncIncrement.abort();
});
