import {
  CountryCovidCasesDto,
  CountryCovidDeathsDto,
  CountryCovidHospitalizationsDto,
  CountryCovidTestsDto,
  CountryCovidVaccinationsDto,
  CountryDto
} from '@dtos';
import { Injectable } from '@nestjs/common';
import { ConfirmedCovidCases, ConfirmedCovidDeaths, CovidHospitalizations, CovidTests, CovidVaccinations } from '@prisma/client';
import { CountryWithAllCovidDataEntity } from './country-covid.entities';

@Injectable()
export class CountryCovidMapper {
  mapEntitiesToDto(countryEntities: CountryWithAllCovidDataEntity[]): CountryDto[] {
    return countryEntities.map(
      ({ covidCases = [], covidDeaths = [], covidHospitalizations = [], covidTests = [], covidVaccinations = [], id, isoCode, name }) => {
        const countryDto: CountryDto = {
          id: id.toString(),
          isoCode,
          name,
          covidCases: covidCases.map(this.mapCovidCasesEntityToDto),
          covidDeaths: covidDeaths.map(this.mapCovidDeathsEntityToDto),
          covidHospitalizations: covidHospitalizations.map(this.mapCovidHospitalizationsEntityToDto),
          covidTests: covidTests.map(this.mapCovidTestsEntityToDto),
          covidVaccinations: covidVaccinations.map(this.mapCovidVaccinationsEntityToDto),
        };

        return countryDto;
      },
    );
  }

  private mapCovidVaccinationsEntityToDto({
    date,
    newVaccinations,
    peopleFullyVaccinated,
    peopleVaccinated,
    totalBoosters,
    totalVaccinations,
  }: CovidVaccinations): CountryCovidVaccinationsDto {
    return {
      date,
      newVaccinations,
      peopleFullyVaccinated: peopleFullyVaccinated?.toString(),
      peopleVaccinated: peopleVaccinated?.toString(),
      totalBoosters: totalBoosters?.toString(),
      totalVaccinations: totalVaccinations?.toString(),
    };
  }

  private mapCovidTestsEntityToDto({ date, newTests, positiveRate, testsPerCase, totalTests }: CovidTests): CountryCovidTestsDto {
    return {
      date,
      newTests,
      positiveRate,
      testsPerCase,
      totalTests: totalTests?.toString(),
    };
  }

  private mapCovidCasesEntityToDto({ date, newCases, totalCases }: ConfirmedCovidCases): CountryCovidCasesDto {
    return {
      date,
      newCases,
      totalCases: totalCases?.toString(),
    };
  }

  private mapCovidDeathsEntityToDto({ date, newDeaths, totalDeaths }: ConfirmedCovidDeaths): CountryCovidDeathsDto {
    return {
      date,
      newDeaths,
      totalDeaths: totalDeaths?.toString(),
    };
  }

  private mapCovidHospitalizationsEntityToDto({
    date,
    hospPatients,
    icuPatients,
    weeklyHospAdmissions,
    weeklyIcuAdmissions,
  }: CovidHospitalizations): CountryCovidHospitalizationsDto {
    return {
      date,
      hospPatients,
      icuPatients,
      weeklyHospAdmissions,
      weeklyIcuAdmissions,
    };
  }

}
