import { Injectable } from '@nestjs/common';
import { PrismaDateRangeComparator, PrismaService } from '@data-layer';
import { ContinentCovidFilter } from './continent-covid.models';

@Injectable()
export class ContinentCovidRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByCountryAndTime({ continentIds, dateRange }: ContinentCovidFilter) {
    return this.prismaService.continent.findMany({
      where: { id: { in: continentIds } },
      include: {
        covidData: {
          where: {
            date:
              PrismaDateRangeComparator.dateInsideRange(dateRange)
          },
          orderBy: [{ date: 'desc' }],
        },
      },
    });
  }
}
