import { PrismaDateRangeComparator } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { commaSeparatedStringToNumberArray } from '@utils';
import { CountryCovidRequestQuery } from './country-covid.models';
import { CountryCovidRepository } from './country-covid.repository';

@Injectable()
export class CountryCovidService {
  constructor(
    private readonly countryCovidRepository: CountryCovidRepository,
  ) {}

  findByCountryAndTime(query: CountryCovidRequestQuery) {
    const countryIds = query.countryIds
      ? commaSeparatedStringToNumberArray(query.countryIds)
      : undefined;
    const { start, end } = query;

    return this.countryCovidRepository.findByCountryAndTime({
      countryIds,
      covidDataArgs: {
        confirmedCovidCases: {
          where: {
            date: PrismaDateRangeComparator.dateInsideRange({ start, end }),
          },
          select: {
            date: true,
            newCases: query.newCases,
            totalCases: query.totalCases,
          },
        },
      },
    });
  }
}
