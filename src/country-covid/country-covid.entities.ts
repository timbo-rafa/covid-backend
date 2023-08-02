import { Prisma } from '@prisma/client';
import {
  includeCovidDataInCountryQuery,
  selectCovidCases,
  selectCovidDeaths,
  selectCovidHospitalizations,
  selectCovidTests,
  selectCovidVaccinations,
} from './country-covid.queries';

export type CountryDbQueryArgs = {
  covidCases: ReturnType<typeof selectCovidCases> | undefined;
  covidDeaths: ReturnType<typeof selectCovidDeaths> | undefined;
  covidHospitalizations: ReturnType<typeof selectCovidHospitalizations> | undefined;
  covidTests: ReturnType<typeof selectCovidTests> | undefined;
  covidVaccinations: ReturnType<typeof selectCovidVaccinations> | undefined;
};

export type CountryWithAllCovidDataEntity = Prisma.CountryGetPayload<ReturnType<typeof includeCovidDataInCountryQuery>>;
