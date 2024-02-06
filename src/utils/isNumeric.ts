export function isNumeric(value?: string | number | null): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
}
