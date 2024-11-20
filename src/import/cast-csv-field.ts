import { CastingFunction } from 'csv-parse/.';

export const castCsvColumn: CastingFunction = (value, context) => {
  if (context.header) return value;

  if (value === '') {
    return null;
  }

  const n = Number(value);
  if (!Number.isNaN(n)) {
    return n;
  }

  const ms = Date.parse(value);
  if (!Number.isNaN(ms)) {
    return new Date(ms);
  }

  return value;
};
