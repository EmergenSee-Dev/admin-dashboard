
import { atomWithStorage } from "jotai/utils";

const storage = typeof window !== "undefined" ? localStorage : undefined;

export const token = atomWithStorage<string | any>("token", null, {
  getItem: (key) => storage?.getItem(key) ?? null,
  setItem: (key, value) => storage?.setItem(key, value),
  removeItem: (key) => storage?.removeItem(key),
});