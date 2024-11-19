import {
  ConfirmedCovidCases,
  ConfirmedCovidDeaths,
  Country,
  CovidHospitalizations,
  CovidTests,
  CovidVaccinations,
} from '@prisma/client';
import { SerializedDto } from '@utils';
import { CountryCovidTableDto } from './country-covid-table.dto';

type CountryCovidEntities = Country &
  ConfirmedCovidCases &
  ConfirmedCovidDeaths &
  CovidVaccinations &
  CovidTests &
  CovidHospitalizations;

export function getCountryCovidTableSerializedDtoStub(
  input: Partial<CountryCovidEntities> = {},
): SerializedDto<CountryCovidTableDto> {
  const dto = getCountryCovidTableDtoStub(input);

  return {
    ...dto,
    date: dto.date.toISOString(),
  };
}

export function getCountryCovidTableDtoStub({
  date = new Date(0),
  id = 0,
  isoCode = 'CAN',
  name = 'Canada',
  hospPatients = null,
  icuPatients = null,
  newCases = null,
  newDeaths = null,
  newTests = null,
  newVaccinations = null,
  peopleFullyVaccinated = null,
  peopleVaccinated = null,
  positiveRate = null,
  testsPerCase = null,
  totalBoosters = null,
  totalCases = null,
  totalDeaths = null,
  totalTests = null,
  totalVaccinations = null,
  weeklyHospAdmissions = null,
  weeklyIcuAdmissions = null,
}: Partial<CountryCovidEntities> = {}): CountryCovidTableDto {
  return {
    id: id.toString(),
    date,
    isoCode,
    name,
    hospPatients,
    icuPatients,
    newCases,
    newDeaths,
    newTests,
    newVaccinations,
    peopleFullyVaccinated: peopleFullyVaccinated?.toString() || null,
    peopleVaccinated: peopleVaccinated?.toString() || null,
    positiveRate,
    testsPerCase,
    totalBoosters: totalBoosters?.toString() || null,
    totalCases: totalCases?.toString() || null,
    totalDeaths: totalDeaths?.toString() || null,
    totalTests: totalTests?.toString() || null,
    totalVaccinations: totalVaccinations?.toString() || null,
    weeklyHospAdmissions,
    weeklyIcuAdmissions,
  };
}
