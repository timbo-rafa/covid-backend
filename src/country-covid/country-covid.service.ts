import { PrismaDateRangeComparator } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { CountryCovidServiceArgs } from './country-covid.models';
import { CountryCovidRepository } from './country-covid.repository';
import { CountryCovidMapper } from './country-covid.mapper';
import { CountryCovidTableMapper } from './country-covid-table.mapper';

@Injectable()
export class CountryCovidService {
  constructor(
    private readonly countryCovidRepository: CountryCovidRepository,
    private readonly countryCovidMapper: CountryCovidMapper,
    private readonly countryCovidTableMapper: CountryCovidTableMapper
  ) {}

  async findCountryCovidTableDataByCountryAndTime(query: CountryCovidServiceArgs) {
    const countryCovidData = await this.findByCountryAndTime(query);

    return this.countryCovidTableMapper.mapEntitiesTo2dTableDto(countryCovidData);
  }

  async findCountryCovidDataByCountryAndTime(query: CountryCovidServiceArgs) {
    const countryCovidData = await this.findByCountryAndTime(query);

    return this.countryCovidMapper.mapEntitiesToDto(countryCovidData);
  }

  async findByCountryAndTime(query: CountryCovidServiceArgs) {
    const { countryIds, dateRange, selectCovidFields } = query;

    const {
      shouldIncludeCovidCases,
      shouldIncludeCovidDeaths,
      shouldIncludeCovidTests,
      shouldIncludeCovidHospitalizations,
      shouldIncludeCovidVaccinations,
    } = this.selectCovidSubTables(selectCovidFields);

    const countryCovidData = await this.countryCovidRepository.findByCountryAndTime({
      countryIds,
      covidDataArgs: {
        covidCases: shouldIncludeCovidCases
          ? {
              where: { date: PrismaDateRangeComparator.dateInsideRange(dateRange) },
              select: {
                date: selectCovidFields.has('date'),
                newCases: selectCovidFields.has('newCases'),
                totalCases: selectCovidFields.has('totalCases'),
              },
            }
          : undefined,
        covidDeaths: shouldIncludeCovidDeaths
          ? {
              where: { date: PrismaDateRangeComparator.dateInsideRange(dateRange) },
              select: {
                date: selectCovidFields.has('date'),
                newDeaths: selectCovidFields.has('newDeaths'),
                totalDeaths: selectCovidFields.has('totalDeaths'),
              },
            }
          : undefined,
        covidHospitalizations: shouldIncludeCovidHospitalizations
          ? {
              where: { date: PrismaDateRangeComparator.dateInsideRange(dateRange) },
              select: {
                date: selectCovidFields.has('date'),
                hospPatients: selectCovidFields.has('hospPatients'),
                icuPatients: selectCovidFields.has('icuPatients'),
                weeklyHospAdmissions: selectCovidFields.has('weeklyHospAdmissions'),
                weeklyIcuAdmissions: selectCovidFields.has('weeklyIcuAdmissions'),
              },
            }
          : undefined,
        covidTests: shouldIncludeCovidTests
          ? {
              where: {
                date: PrismaDateRangeComparator.dateInsideRange(dateRange),
              },
              select: {
                date: selectCovidFields.has('date'),
                newTests: selectCovidFields.has('newTests'),
                positiveRate: selectCovidFields.has('positiveRate'),
                testsPerCase: selectCovidFields.has('testsPerCase'),
                totalTests: selectCovidFields.has('totalTests'),
              },
            }
          : undefined,
        covidVaccinations: shouldIncludeCovidVaccinations
          ? {
              where: { date: PrismaDateRangeComparator.dateInsideRange(dateRange) },
              select: {
                date: selectCovidFields.has('date'),
                newVaccinations: selectCovidFields.has('newVaccinations'),
                peopleFullyVaccinated: selectCovidFields.has('peopleFullyVaccinated'),
                peopleVaccinated: selectCovidFields.has('peopleVaccinated'),
                totalBoosters: selectCovidFields.has('totalBoosters'),
                totalVaccinations: selectCovidFields.has('totalVaccinations'),
              },
            }
          : undefined,
      },
    });
    return countryCovidData;
  }

  private selectCovidSubTables(selectCovidFields: CountryCovidServiceArgs['selectCovidFields']) {
    const shouldIncludeCovidCases = selectCovidFields.has('newCases') || selectCovidFields.has('totalCases');
    const shouldIncludeCovidDeaths = selectCovidFields.has('newDeaths') || selectCovidFields.has('totalDeaths');
    const shouldIncludeCovidHospitalizations =
      selectCovidFields.has('hospPatients') ||
      selectCovidFields.has('icuPatients') ||
      selectCovidFields.has('weeklyHospAdmissions') ||
      selectCovidFields.has('weeklyIcuAdmissions');
    const shouldIncludeCovidTests =
      selectCovidFields.has('newTests') ||
      selectCovidFields.has('totalTests') ||
      selectCovidFields.has('testsPerCase') ||
      selectCovidFields.has('positiveRate');
    const shouldIncludeCovidVaccinations =
      selectCovidFields.has('newVaccinations') ||
      selectCovidFields.has('totalVaccinations') ||
      selectCovidFields.has('peopleVaccinated') ||
      selectCovidFields.has('peopleFullyVaccinated') ||
      selectCovidFields.has('totalBoosters');

    return {
      shouldIncludeCovidCases,
      shouldIncludeCovidDeaths,
      shouldIncludeCovidTests,
      shouldIncludeCovidHospitalizations,
      shouldIncludeCovidVaccinations,
    };
  }
}
