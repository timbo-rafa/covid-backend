import { RecursivePartial } from '@utils';
import { CountryWithAllCovidDataEntity } from './country-covid.entities';
import { ConfirmedCovidCases, ConfirmedCovidDeaths, CovidHospitalizations, CovidTests, CovidVaccinations } from '@prisma/client';

export function getCountryEntityStub({
  continentId = 4,
  id = 38,
  isoCode = 'CAN',
  name = 'Canada',
  covidVaccinations = [],
  covidCases = [],
  covidDeaths = [],
  covidHospitalizations = [],
  covidTests = [],
}: RecursivePartial<CountryWithAllCovidDataEntity> = {}): CountryWithAllCovidDataEntity {
  return {
    continentId,
    id,
    isoCode,
    name,
    covidVaccinations: covidVaccinations.map((c) => getCovidVaccinationsStub(c)),
    covidCases: covidCases.map((c) => getCovidCasesStub(c)),
    covidDeaths: covidDeaths.map((c) => getCovidDeathsStub(c)),
    covidHospitalizations: covidHospitalizations.map((c) => getCovidHospitalizationsStub(c)),
    covidTests: covidTests.map((c) => getCovidTestsStub(c)),
  };
}

export function getCovidHospitalizationsStub({
  countryId = 38,
  date = new Date(0),
  hospPatients = null,
  icuPatients = null,
  weeklyHospAdmissions = null,
  weeklyIcuAdmissions = null,
}: Partial<CovidHospitalizations>): CovidHospitalizations {
  return {
    countryId,
    date,
    hospPatients,
    icuPatients,
    weeklyHospAdmissions,
    weeklyIcuAdmissions,
  };
}

export function getCovidTestsStub({
  countryId = 38,
  date = new Date(0),
  newTests = null,
  positiveRate = null,
  testsPerCase = null,
  totalTests = null,
}: Partial<CovidTests>): CovidTests {
  return {
    countryId,
    date,
    newTests,
    positiveRate,
    testsPerCase,
    totalTests,
  };
}

export function getCovidVaccinationsStub({
  countryId = 38,
  date = new Date(0),
  newVaccinations = 0,
  peopleFullyVaccinated = null,
  peopleVaccinated = null,
  totalBoosters = null,
  totalVaccinations = null,
}: Partial<CovidVaccinations>): CovidVaccinations {
  return {
    countryId,
    date,
    newVaccinations,
    peopleFullyVaccinated,
    peopleVaccinated,
    totalBoosters,
    totalVaccinations,
  };
}

export function getCovidCasesStub({
  countryId = 38,
  date = new Date(0),
  newCases = 0,
  totalCases = null,
}: Partial<ConfirmedCovidCases>): ConfirmedCovidCases {
  return {
    countryId,
    date,
    newCases,
    totalCases,
  };
}

export function getCovidDeathsStub({
  countryId = 38,
  date = new Date(0),
  newDeaths = 0,
  totalDeaths = null,
}: Partial<ConfirmedCovidDeaths>): ConfirmedCovidDeaths {
  return {
    countryId,
    date,
    newDeaths,
    totalDeaths,
  };
}

test.skip('', () => {})
