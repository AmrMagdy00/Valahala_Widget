/**
 * Type guards and validation utilities
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
