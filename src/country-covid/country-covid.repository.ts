import { Injectable } from '@nestjs/common';
import { PrismaDateRangeComparator, PrismaService } from '@data-layer';
import { CountryCovidArgs } from './country-covid.models';
import { includeCovidDataInCountryQuery } from './country-covid.queries';

@Injectable()
export class CountryCovidRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByCountryAndTime({ countryIds, covidDataArgs, covidDataDefaults }: CountryCovidArgs) {
    return this.prismaService.country.findMany({
      where: { id: { in: countryIds } },

      // covidData: {
      //   where: {
      //     date: PrismaComparator.dateInsideRange(dateRange)
      //   },
      //   orderBy: [{ date: 'desc' }],
      //   take: 100,
      // },
      ...includeCovidDataInCountryQuery(covidDataArgs, covidDataDefaults),
    });
  }
}
