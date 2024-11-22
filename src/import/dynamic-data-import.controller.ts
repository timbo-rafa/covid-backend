import { Body, Controller, Post } from '@nestjs/common';
import { DynamicDataImportService } from './dynamic-data-import.service';

@Controller('/import')
export class DynamicDataImportController {
  constructor(private readonly dynamicDataImportService: DynamicDataImportService) {}

  @Post('/url')
  importByUrl(@Body('url') encodedURL: string) {
    return this.dynamicDataImportService.importDynamicCsvData(encodedURL);
  }
}
