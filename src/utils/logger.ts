/**
 * Logger utility - Production ready (no-op in production)
 */
export const logger = {
  info: (...args: unknown[]) => {
    // Production: no logging
  },
  error: (...args: unknown[]) => {
    // Production: no logging
  },
  warn: (...args: unknown[]) => {
    // Production: no logging
  },
};
