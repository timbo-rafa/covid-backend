import { Controller, Get, Query } from '@nestjs/common';
import { ContinentCovidService } from './continent-covid.service';
import { ContinentCovidRequestQuery } from './continent-covid.models';
import { commaSeparatedStringToNumberArray } from '@utils';

@Controller()
export class ContinentCovidController {
  constructor(private readonly continentCovidService: ContinentCovidService) { }

  @Get('/query')
  query(@Query() query: ContinentCovidRequestQuery) {
    const continentIds = query.continentIds ? commaSeparatedStringToNumberArray(query.continentIds) : undefined;
    const { start, end } = query;
    return this.continentCovidService.findByContinentAndTime({ continentIds, dateRange: { start, end } })
  }
}
