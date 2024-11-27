import { Body, Controller, Post } from '@nestjs/common';
import { DynamicDataImportService } from './dynamic-data-import.service';
import { DatabaseMetadataService } from '@data-layer';

@Controller('/import')
export class DynamicDataImportController {
  constructor(
    private readonly dynamicDataImportService: DynamicDataImportService,
    private readonly databaseMetadataService: DatabaseMetadataService,
  ) {}

  @Post('/url')
  async importByUrl(@Body('url') encodedURL: string) {
    // const validatedTableName = await this.databaseMetadataService.getTableName(tableName);

    // if (validatedTableName) {
    //   throw new TableAlreadyExistsException(`table name ${tableName} already exists`);
    // }

    // 'http%3A%2F%2Flocalhost%3A3000%2Fowid-covid-compact.csv'
    return this.dynamicDataImportService.importDynamicCsvData(encodedURL);
  }
}
