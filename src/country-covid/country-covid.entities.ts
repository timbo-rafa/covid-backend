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
  covidCases: Omit<ReturnType<typeof selectCovidCases>, 'take'> | undefined;
  covidDeaths: Omit<ReturnType<typeof selectCovidDeaths>, 'take'> | undefined;
  covidHospitalizations: Omit<ReturnType<typeof selectCovidHospitalizations>, 'take'> | undefined;
  covidTests: Omit<ReturnType<typeof selectCovidTests>, 'take'> | undefined;
  covidVaccinations: Omit<ReturnType<typeof selectCovidVaccinations>, 'take'> | undefined;
};

export type CountryWithAllCovidDataEntity = Prisma.CountryGetPayload<ReturnType<typeof includeCovidDataInCountryQuery>>;
