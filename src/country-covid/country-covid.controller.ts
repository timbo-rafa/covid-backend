import { Controller, Get, Param } from '@nestjs/common';
import { CountryCovidService } from './country-covid.service';

@Controller('')
export class CountryCovidController {
  constructor(private readonly countryCovidService: CountryCovidService) { }

  @Get('/query')
  query(@Param('countryIds') countryIds: number[], @Param('start') start: Date, @Param('end') end: Date) {
    return this.countryCovidService.findByCountryAndTime({countryIds, dateRange: {start, end}})
  }
}
