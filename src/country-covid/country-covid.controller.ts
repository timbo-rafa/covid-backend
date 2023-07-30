import { Controller, Get, Query } from '@nestjs/common';
import { CountryCovidRequestQuery } from './country-covid.models';
import { CountryCovidService } from './country-covid.service';

@Controller()
export class CountryCovidController {
  constructor(private readonly countryCovidService: CountryCovidService) {}

  @Get('/covid-data')
  query(@Query() query: CountryCovidRequestQuery) {
    return this.countryCovidService.findByCountryAndTime(query);
  }
}
