import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Validate with custom dayjs parser
 */
export function validateDate(date: string | Date, format: string): boolean {
  dayjs.extend(customParseFormat);
  return dayjs(date, format, true).isValid();
}

export function toISOString(date: string | Date, format?: string): string {
  return dayjs(date, format).toISOString();
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
