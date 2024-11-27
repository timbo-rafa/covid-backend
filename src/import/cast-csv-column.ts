import { CastingFunction } from 'csv-parse/.';
import { parseISO } from 'date-fns';

export const castCsvColumn: CastingFunction = (value, context) => {
  if (context.header) return value;

  if (value === '') {
    return null;
  }

  const n = Number(value);
  if (!Number.isNaN(n)) {
    return n;
  }

  const date = parseISO(value);
  if (!Number.isNaN(date.getTime())) {
    return new Date(date);
  }

  return value;
};
