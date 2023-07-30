import { Injectable } from '@nestjs/common';
import { PrismaService } from '@data-layer';
import { ContinentCovidFilter } from './continent-covid.models';

@Injectable()
export class ContinentCovidRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByCountryAndTime({ continentIds, dateRange: { start, end } }: ContinentCovidFilter) {
    return this.prismaService.continent.findMany({
      where: { id: { in: continentIds } },
      include: {
        covidData: {
          where: {
            date:
              start !== undefined || end !== undefined
                ? {
                    gte: start,
                    lt: end,
                  }
                : undefined,
          },
          orderBy: [{ date: 'desc' }],
        },
      },
    });
  }
}
