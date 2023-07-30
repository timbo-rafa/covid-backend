import { Controller, Get, Query } from '@nestjs/common';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidRequestQuery } from './country-covid.models';
import { commaSeparatedStringToNumberArray } from '@utils';

@Controller()
export class CountryCovidController {
  constructor(private readonly countryCovidService: CountryCovidService) {}

  @Get('/query')
  query(@Query() query: CountryCovidRequestQuery) {
    const countryIds = query.countryIds ? commaSeparatedStringToNumberArray(query.countryIds) : undefined;
    const { start, end } = query;
    return this.countryCovidService.findByCountryAndTime({
      countryIds,
      dateRange: { start, end },
    });
  }
}
