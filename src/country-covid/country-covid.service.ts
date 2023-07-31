import { PrismaDateRangeComparator } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { CountryCovidServiceArgs } from './country-covid.models';
import { CountryCovidRepository } from './country-covid.repository';

@Injectable()
export class CountryCovidService {
  constructor(private readonly countryCovidRepository: CountryCovidRepository) {}

  async findByCountryAndTime(query: CountryCovidServiceArgs) {
    const { countryIds, dateRange, selectCovidCasesDataFields } = query;

    console.log(selectCovidCasesDataFields)
    const countryCovidData = await this.countryCovidRepository.findByCountryAndTime({
      countryIds,
      covidDataArgs: {
        covidCases:
          selectCovidCasesDataFields.size > 0
            ? {
                where: {
                  date: PrismaDateRangeComparator.dateInsideRange(dateRange),
                },
                select: {
                  date: selectCovidCasesDataFields.has('date'),
                  newCases: selectCovidCasesDataFields.has('newCases'),
                  totalCases: selectCovidCasesDataFields.has('totalCases'),
                },
              }
            : undefined,
      },
    });
    return countryCovidData;
  }
}
