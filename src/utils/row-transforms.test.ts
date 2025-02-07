import { filterOutNullOrUndefinedColumns, mapJsDateToUnixTimestamp } from './row-transforms';

describe('row-transforms', () => {
  describe('filterOutNullOrUndefinedColumns', () => {
    test('Should filter out null and undefineds', () => {
      const sampleData = { name: undefined, cases: null };

      const result = filterOutNullOrUndefinedColumns(sampleData);

      expect(result).toEqual({});
    });

    test('Does not filter 0', () => {
      const sampleData = { cases: 0 };

      const result = filterOutNullOrUndefinedColumns(sampleData);

      expect(result).toEqual(sampleData);
    });
  });

  describe('mapJsDateToUnixTimestamp', () => {
    test('should convert Date fields to Unix timestamps', () => {
      const sampleData = { created: new Date('2024-01-01'), name: 'sample' };

      const result = mapJsDateToUnixTimestamp(sampleData);

      expect(result).toEqual({ created: new Date('2024-01-01').getTime(), name: 'sample' });
    });

    test('should handle empty data', () => {
      const result = mapJsDateToUnixTimestamp({});

      expect(result).toEqual({});
    });

    test('should not modify non-Date fields', () => {
      const data = { name: 'Item1', created: 1700000000000, updated: '2024-01-01' };
      const result = mapJsDateToUnixTimestamp(data);

      expect(result).toEqual(data);
    });
  });
});
