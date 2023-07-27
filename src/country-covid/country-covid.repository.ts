import { Injectable } from "@nestjs/common";
import { PrismaService } from "@data-layer";
import { CountryCovidFilter } from "./country-covid.models";

@Injectable()
export class CountryCovidRepository {
  constructor(private readonly prismaService: PrismaService) { }


  findByCountryAndTime({ countryIds, dateRange: { start, end } }: CountryCovidFilter) {
    return this.prismaService.country.findMany({
      where: { id: { in: countryIds } },
      include: {
        covidData: {
          where: {
            date: start !== undefined || end !== undefined ? {
              gte: start,
              lt: end
            } : undefined
          },
          orderBy: [{date: 'desc'}],
          take: 100
        }
      }
    })
  }
}