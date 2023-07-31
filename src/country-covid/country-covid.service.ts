import { PrismaDateRangeComparator } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { CountryCovidServiceArgs } from './country-covid.models';
import { CountryCovidRepository } from './country-covid.repository';

@Injectable()
export class CountryCovidService {
  constructor(
    private readonly countryCovidRepository: CountryCovidRepository,
  ) {}

  async findByCountryAndTime(query: CountryCovidServiceArgs) {
    const {countryIds, dateRange, selectCovidDataFields} = query

    const countryCovidData = await this.countryCovidRepository.findByCountryAndTime({
      countryIds,
      covidDataArgs: {
        covidCases: {
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(dateRange),
          },
          select: {
            date: selectCovidDataFields.has('date'),
            newCases: selectCovidDataFields.has('newCases'),
            totalCases: selectCovidDataFields.has('totalCases'),
          },
        },
      },
    });
    return countryCovidData;
  }
}
