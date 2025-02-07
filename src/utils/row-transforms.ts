import { isDate, isDefined } from "class-validator";

export function filterOutNullOrUndefinedColumns<ValueType>(row: Record<string, ValueType | undefined | null>) {
  const newRow: Record<string, ValueType> = {};
  for (let [key, value] of Object.entries(row)) {
    if (isDefined(value)) {
      newRow[key] = value;
    }
  }
  return newRow;
}

export function mapJsDateToUnixTimestamp<ValueType = unknown>(row: Record<string, ValueType | Date>) {
  const newRow: Record<string, ValueType | number> = {};
  for (let [key, value] of Object.entries(row)) {
    newRow[key] = isDate(value) ? value.getTime() : value;
  } 
  return newRow;
}