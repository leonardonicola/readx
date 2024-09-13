import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DefaultFetchResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export async function defaultFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const { data, error } = await res.json();
  if (error) {
    throw new Error(error);
  }
  return data satisfies T;
}
