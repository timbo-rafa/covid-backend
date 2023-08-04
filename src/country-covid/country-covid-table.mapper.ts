import { CountryCovidTableDto } from '@dtos';
import { Injectable } from '@nestjs/common';
import { CountryWithAllCovidDataEntity } from './country-covid.entities';

@Injectable()
export class CountryCovidTableMapper {
  mapEntitiesTo2dTableDto(countryEntities: CountryWithAllCovidDataEntity[]): CountryCovidTableDto[] {
    const dtos = countryEntities
      .flatMap((countryEntity) => {
        const countryTableByDateDictionary: Record<number, CountryCovidTableDto> = {};
        const {
          name,
          isoCode,
          covidCases = [],
          covidDeaths = [],
          covidHospitalizations = [],
          covidTests = [],
          covidVaccinations = [],
          id,
        } = countryEntity;

        for (const covidCase of covidCases) {
          const timestamp = covidCase.date.getTime();
          const { date, newCases, totalCases } = covidCase;
          if (!countryTableByDateDictionary[timestamp]) {
            countryTableByDateDictionary[timestamp] = this.initializeCountryCovidTableDto({ id, isoCode, name, date });
          }
          countryTableByDateDictionary[timestamp].newCases = newCases;
          countryTableByDateDictionary[timestamp].totalCases = totalCases?.toString() || null;
        }

        for (const covidDeath of covidDeaths) {
          const timestamp = covidDeath.date.getTime();
          const { date, newDeaths, totalDeaths } = covidDeath;
          if (!countryTableByDateDictionary[timestamp]) {
            countryTableByDateDictionary[timestamp] = this.initializeCountryCovidTableDto({ id, isoCode, name, date });
          }
          countryTableByDateDictionary[timestamp].newDeaths = newDeaths;
          countryTableByDateDictionary[timestamp].totalDeaths = totalDeaths?.toString() || null;
        }

        for (const hospitalization of covidHospitalizations) {
          const timestamp = hospitalization.date.getTime();
          const { date, hospPatients, icuPatients, weeklyHospAdmissions, weeklyIcuAdmissions } = hospitalization;
          if (!countryTableByDateDictionary[timestamp]) {
            countryTableByDateDictionary[timestamp] = this.initializeCountryCovidTableDto({ id, isoCode, name, date });
          }
          countryTableByDateDictionary[timestamp].hospPatients = hospPatients;
          countryTableByDateDictionary[timestamp].icuPatients = icuPatients;
          countryTableByDateDictionary[timestamp].weeklyHospAdmissions = weeklyHospAdmissions;
          countryTableByDateDictionary[timestamp].weeklyIcuAdmissions = weeklyIcuAdmissions;
        }

        for (const vaccination of covidVaccinations) {
          const timestamp = vaccination.date.getTime();
          const { date, newVaccinations, peopleFullyVaccinated, peopleVaccinated, totalBoosters, totalVaccinations } =
            vaccination;
          if (!countryTableByDateDictionary[timestamp]) {
            countryTableByDateDictionary[timestamp] = this.initializeCountryCovidTableDto({ id, isoCode, name, date });
          }
          countryTableByDateDictionary[timestamp].newVaccinations = newVaccinations;
          countryTableByDateDictionary[timestamp].peopleFullyVaccinated = peopleFullyVaccinated?.toString() || null;
          countryTableByDateDictionary[timestamp].peopleVaccinated = peopleVaccinated?.toString() || null;
          countryTableByDateDictionary[timestamp].totalBoosters = totalBoosters?.toString() || null;
          countryTableByDateDictionary[timestamp].totalVaccinations = totalVaccinations?.toString() || null;
        }

        for (const covidTest of covidTests) {
          const timestamp = covidTest.date.getTime();
          const { date, newTests, positiveRate, testsPerCase, totalTests } = covidTest;
          if (!countryTableByDateDictionary[timestamp]) {
            countryTableByDateDictionary[timestamp] = this.initializeCountryCovidTableDto({ id, isoCode, name, date });
          }
          countryTableByDateDictionary[timestamp].newTests = newTests;
          countryTableByDateDictionary[timestamp].positiveRate = positiveRate;
          countryTableByDateDictionary[timestamp].testsPerCase = testsPerCase;
          countryTableByDateDictionary[timestamp].totalTests = totalTests?.toString() || null;
        }

        return Object.keys(countryTableByDateDictionary)
          .sort((n1, n2) => Number(n2) - Number(n1))
          .map<CountryCovidTableDto>((timestamp) => countryTableByDateDictionary[timestamp]);
      })

    return dtos;
  }

  private initializeCountryCovidTableDto({
    date,
    id,
    isoCode,
    name,
  }: {
    id: number;
    date: Date;
    isoCode: string;
    name: string;
  }): CountryCovidTableDto {
    return {
      date,
      id: String(id),
      isoCode,
      name,
      hospPatients: null,
      icuPatients: null,
      newCases: null,
      newDeaths: null,
      newTests: null,
      newVaccinations: null,
      peopleFullyVaccinated: null,
      peopleVaccinated: null,
      positiveRate: null,
      testsPerCase: null,
      totalBoosters: null,
      totalCases: null,
      totalDeaths: null,
      totalTests: null,
      totalVaccinations: null,
      weeklyHospAdmissions: null,
      weeklyIcuAdmissions: null,
    };
  }
}
