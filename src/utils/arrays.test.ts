import { commaSeparatedStringToNumberArray, convertJsDatesToUnixTimestamp } from './arrays';

describe('commaSeparatedStringToNumberArray', () => {
  test('1,2,3,4', () => {
    const numberArray = commaSeparatedStringToNumberArray('1,2,3,4');
    expect(numberArray).toEqual([1, 2, 3, 4]);
  });
});

describe('convertJsDatesToUnixTimestamp', () => {
  test('should convert Date fields to Unix timestamps', () => {
    const sampleData = [
      { created: new Date('2024-01-01') },
      { created: new Date('2024-01-02') },
      { created: new Date('2024-01-03') },
    ];

    const result = convertJsDatesToUnixTimestamp(sampleData);

    expect(result).toEqual([
      { created: new Date('2024-01-01').getTime() },
      { created: new Date('2024-01-02').getTime() },
      { created: new Date('2024-01-03').getTime() },
    ]);
  });

  test('should handle empty data array', () => {
    const result = convertJsDatesToUnixTimestamp([]);

    expect(result).toEqual([]);
  });

  test('should not modify non-Date fields', () => {
    const data = [{ name: 'Item1', created: 1700000000000, updated: '2024-01-01' }];
    const result = convertJsDatesToUnixTimestamp(data);

    expect(result).toEqual(data);
  });

  test('should handle data with null or undefined fields', () => {
    const data = [{ updated: null }, { updated: undefined }];
    const result = convertJsDatesToUnixTimestamp(data);

    expect(result).toEqual([{ updated: null }, { updated: undefined }]);
  });
});
