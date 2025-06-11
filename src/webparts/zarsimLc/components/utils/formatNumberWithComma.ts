export function formatNumberWithComma(value: any): string {
  const number = Number(value);
  if (isNaN(number)) return '';
  return number.toLocaleString('en-US');
}
