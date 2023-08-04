import { Controller, Get } from '@nestjs/common';
import { OwidDataImportService } from './owid-data-import.service';

@Controller('/import')
export class OwidDataImportController {
  constructor(private readonly owidDataImportService: OwidDataImportService) {}

  @Get('/latest')
  latest() {
    const csvUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv';
    return this.owidDataImportService.importOwidCsvData(csvUrl);
  }

  @Get('/full-set')
  fullSet() {
    const csvUrl = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';
    //const csvUrl = 'http://127.0.0.1:8080/owid-covid-data.csv';
    return this.owidDataImportService.importOwidCsvData(csvUrl);
  }
}
