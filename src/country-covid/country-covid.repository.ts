import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { CountryCovidArgs } from './country-covid.models';
import { includeCovidDataInCountryQuery } from './country-covid.queries';
import { CountryWithAllCovidDataEntity } from './country-covid.entities';

@Injectable()
export class CountryCovidRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByCountryAndTime({
    countryIds,
    covidDataArgs,
    covidDataDefaults,
  }: CountryCovidArgs): Promise<CountryWithAllCovidDataEntity[]> {
    const relationalCovidDataArgs = includeCovidDataInCountryQuery(covidDataArgs, covidDataDefaults);
    return this.prismaService.country.findMany({
      where: { id: { in: countryIds } },
      // covidData: {
      //   where: {
      //     date: PrismaComparator.dateInsideRange(dateRange)
      //   },
      //   orderBy: [{ date: 'desc' }],
      //   take: 100,
      // },
      ...relationalCovidDataArgs,
    });
  }
}
