export function commaSeparatedStringToNumberArray(str: string) {
  return str.split(',').map((id) => Number(id));
}