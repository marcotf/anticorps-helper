import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleFieldError<T>(
  error: ZodError<T>,
): Record<string, string> {
  const err = error.flatten();
  return {
    ...Object.fromEntries(
      Object.entries(err.fieldErrors).map(([key, value]) => [
        key,
        value as string,
      ]),
    ),
  };
}
