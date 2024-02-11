export function isNumeric(value?: string | number | boolean | null): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
}
