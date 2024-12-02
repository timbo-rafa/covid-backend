import { isDate } from 'node:util/types';

export function commaSeparatedStringToNumberArray(str: string) {
  return str.split(',').map((id) => Number(id));
}

export function convertJsDatesToUnixTimestamp<
  DataType extends Record<string, ValueType | Date>,
  ValueType extends string | number | null | undefined,
>(data: DataType[]): Record<string, NonNullable<ValueType> | number>[] {
  return data.map((dataRow) => {
    const newRow: Record<string, NonNullable<ValueType> | number> = {};
    for (let [key, value] of Object.entries(dataRow)) {
      if (value !== undefined && value !== null) {
        newRow[key] = isDate(value) ? value.getTime() : value;
      }
    }
    return newRow;
  });
}
