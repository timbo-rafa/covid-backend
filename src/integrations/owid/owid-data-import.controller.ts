import { Controller, Get, Query } from '@nestjs/common';
import { commaSeparatedStringToNumberArray } from '@utils';
import { OwidDataImportService } from './owid-data-import.service';

@Controller('/import')
export class OwidDataImportController {
  constructor(private readonly owidDataImportService: OwidDataImportService) {}

  @Get('/latest')
  query() {
    const csvUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv';
    return this.owidDataImportService.importOwidCsvData(csvUrl);
  }
}
