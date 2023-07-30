import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { CountryCovidArgs } from './country-covid.models';
import { includeCovidDataInCountryQuery } from './country-covid.queries';

@Injectable()
export class CountryCovidRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByCountryAndTime({ countryIds, covidDataArgs, covidDataDefaults }: CountryCovidArgs) {

    const queryArgs = includeCovidDataInCountryQuery(covidDataArgs, covidDataDefaults) 

    console.log(JSON.stringify({countryIds,covidDataArgs, covidDataDefaults}))
    console.log(JSON.stringify({queryArgs}))
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
