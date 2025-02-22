import { IS_DEV } from "@/constants/env";

export const logError = (message: string, error: unknown) => {
  if (IS_DEV) {
    console.error(message, JSON.stringify(error));
  } else {
    // TODO: replace with your own data logging service
  }
};
