export type CovidTestsCreateModel = {
  countryId: number;
  date: Date;
  totalTests?: bigint | number;
  newTests?: number;
  positiveRate?: number;
  testsPerCase?: number;
};
