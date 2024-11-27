import { Controller, Get, Query } from '@nestjs/common';
import { TableService } from './table.service';
import { DatabaseMetadataService } from 'src/data-layer/database-module';
import { TableNotFoundException } from 'src/exceptions/bad-request.exception';

@Controller('/table')
export class TableController {
  constructor(private readonly tableService: TableService, private readonly databaseMetadataService: DatabaseMetadataService) {}

  @Get()
  async getTable(@Query('tableName') tableName: string) {
    const validatedTableName = await this.databaseMetadataService.getTableName(tableName);
    if (!validatedTableName) {
      throw new TableNotFoundException(`table ${tableName} not found`);
    }

    return this.tableService.getTableData(validatedTableName);
  }

  async getTableDictionaryByColumn(@Query('tableName') tableName: string, @Query('columnName') columnName: string) {
    const validated = await this.databaseMetadataService.getColumnName(tableName, columnName);
    if (!validated) {
      throw new TableNotFoundException(`table ${tableName} or column ${columnName} not found`);
    }

    return this.tableService.getTableDataDictionaryByColumn(validated.tableName, validated.columnName);
  }
}
