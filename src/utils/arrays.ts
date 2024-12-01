export function commaSeparatedStringToNumberArray(str: string) {
  return str.split(',').map((id) => Number(id));
}

export function convertJsDatesToUnixTimestamp<DataType extends Record<string, string | number | Date | null | undefined>>(data: DataType[]) {
  return data.map((dataRow) => {
    if (typeof dataRow === 'object' && dataRow !== null) {
      for (let [key, value] of Object.entries(dataRow)) {
        if (value instanceof Date) {
          // @ts-ignore
          dataRow[key as keyof typeof dataRow] = value.getTime();
        }
      }
      return dataRow;
    } else {
      return dataRow;
    }
  });
}
