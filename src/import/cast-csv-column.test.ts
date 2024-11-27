import { castCsvColumn } from './cast-csv-column';
import { CastingContext } from 'csv-parse/.';

describe('cast csv field', () => {
  const context = {} as unknown as CastingContext;
  it('parses ISO date', () => {
    const isoString = '2023-10-31T00:00:00.000Z';

    const date = castCsvColumn(isoString, context);

    expect(date.toISOString()).toEqual(isoString);
  });

  it('parses YYYY-MM-DD as date', () => {
    const dateString = '2023-10-31';

    const date: Date = castCsvColumn(dateString, context);

    expect(date.getUTCFullYear()).toEqual(2023);
    expect(date.getUTCMonth()).toEqual(9);
    expect(date.getUTCDate()).toEqual(31);
  });

  it('parses "Summer Olympics 2020" as string', () => {
    const string = 'Summer Olympics 2020';

    const str: string = castCsvColumn(string, context);

    expect(str.toString()).toEqual(string);
    expect(typeof str).toEqual('string');
  });
});
