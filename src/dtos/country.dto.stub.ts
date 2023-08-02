import { CountryCovidTableDto } from './country.dto';

export function getCountryCovidTableDtoStub({
  date = new Date(0),
  id = '0',
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
}: Partial<CountryCovidTableDto> = {}): CountryCovidTableDto {
  return {
    date,
    id,
    isoCode,
    name,
    hospPatients,
    icuPatients,
    newCases,
    newDeaths,
    newTests,
    newVaccinations,
    peopleFullyVaccinated,
    peopleVaccinated,
    positiveRate,
    testsPerCase,
    totalBoosters,
    totalCases,
    totalDeaths,
    totalTests,
    totalVaccinations,
    weeklyHospAdmissions,
    weeklyIcuAdmissions,
  };
}