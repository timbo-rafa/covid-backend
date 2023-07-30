export type ConfirmedDeathsCreateModel = {
  countryId: number;
  date: Date;
  newDeaths?: number;
  totalDeaths?: bigint | number;
};
