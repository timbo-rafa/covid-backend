export function stringYYYYMMDDToDate(date: string) {
  const [year, month, day] = date.split('-');

  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

export type DateRange = {
  start: Date,
  end: Date
}