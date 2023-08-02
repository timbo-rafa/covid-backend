import { CountryCovidCasesDto } from '@dtos';
import { DateRange } from '@utils';
import { CountryDbQueryArgs } from './country-covid.entities';

export type CovidCaseFields = keyof CountryCovidCasesDto;

export type CovidDeathFields = 'newDeaths' | 'totalDeaths';

export type CovidHospitalizationsFields = 'hospPatients' | 'icuPatients' | 'weeklyHospAdmissions' | 'weeklyIcuAdmissions';

export type CovidTestsFields = 'newTests' | 'positiveRate' | 'testsPerCase' | 'totalTests';

export type CovidVaccinationsFields =
  | 'newVaccinations'
  | 'peopleFullyVaccinated'
  | 'peopleVaccinated'
  | 'totalBoosters'
  | 'totalVaccinations';

export type AllCovidDataFields = CovidCaseFields | CovidDeathFields | CovidHospitalizationsFields | CovidTestsFields | CovidVaccinationsFields

export const CovidDataFieldArray: AllCovidDataFields[] = [
  'newCases',
  'totalCases',
  'newDeaths',
  'totalDeaths',
  'hospPatients',
  'icuPatients',
  'weeklyHospAdmissions',
  'weeklyIcuAdmissions',
  'newTests',
  'positiveRate',
  'testsPerCase',
  'totalTests',
  'newVaccinations',
  'peopleFullyVaccinated',
  'peopleVaccinated',
  'totalBoosters',
  'totalVaccinations',
]

export class CountryCovidServiceArgs {
  countryIds?: number[];
  dateRange?: Partial<DateRange>;
  selectCovidFields: Set<AllCovidDataFields>
}

export type CountryCovidArgs = {
  countryIds?: number[];
  covidDataArgs: CountryDbQueryArgs;
  covidDataDefaults?: CountryDbQueryArgs;
  //dateRange?: { start?: Date; end?: Date };
};
