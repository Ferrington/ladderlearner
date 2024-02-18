export function isNumeric(value: unknown): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
}
