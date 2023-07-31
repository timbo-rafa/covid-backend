import { Controller, Get, Query } from '@nestjs/common';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidDataInput } from '@dtos';

@Controller()
export class CountryCovidController {
  constructor(private readonly countryCovidService: CountryCovidService) {}

  // @Get('/covid-data')
  // query(@Query() query: CountryCovidDataInput) {
  //   return this.countryCovidService.findByCountryAndTime(query);
  // }
}
