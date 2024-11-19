import { Controller, Get } from '@nestjs/common';
import { DynamicDataImportService } from './dynamic-data-import.service';

@Controller()
export class DynamicDataImportController {
  constructor(private readonly dynamicDataImportService: DynamicDataImportService) {}

  @Get('/latest')
  latest() {
    const csvUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv';
    return this.dynamicDataImportService.importDynamicCsvData(csvUrl);
  }

  @Get('/full-set')
  fullSet() {
    const csvUrl = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';
    //const csvUrl = 'http://127.0.0.1:8080/owid-covid-data.csv';
    return this.dynamicDataImportService.importDynamicCsvData(csvUrl);
  }

  @Get('/compact')
  compact() {
    const csvUrl = 'http://localhost:3000/owid-covid-latest.csv';
    return this.dynamicDataImportService.importDynamicCsvData(csvUrl);
  }
}
