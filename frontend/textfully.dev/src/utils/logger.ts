import { IS_DEV } from '@/constants/env';

export const logError = (error: unknown) => {
  if (IS_DEV) {
    console.error(JSON.stringify(error));
  } else {
    // TODO: replace with your own data logging service
  }
};
