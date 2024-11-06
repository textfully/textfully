import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noopPromise = async () => {};

export const noComponent = () => null;

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const createRedirectLink = (
  targetPath: string,
  redirectTo: string
): string => {
  const encodedRedirect = encodeURIComponent(redirectTo);
  return `${targetPath}?redirectTo=${encodedRedirect}`;
};
