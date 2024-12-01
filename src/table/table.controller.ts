import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { TableService } from './table.service';
import { DatabaseMetadataService } from 'src/data-layer/database-module';
import { ColumnNotFoundException, TableNotFoundException } from 'src/exceptions';

@Controller('/tables')
export class TableController {
  constructor(private readonly tableService: TableService, private readonly databaseMetadataService: DatabaseMetadataService) {}

  @Get(':tableName')
  async getTable(
    @Param('tableName') tableName: string,
    @Query('dictionaryColumnNames', new ParseArrayPipe({ items: String, separator: ',' })) dictionaryColumnNames?: string[],
    @Query('selectColumnNames', new ParseArrayPipe({ items: String, separator: ',' })) selectColumnNames?: string[],
  ) {
    if (dictionaryColumnNames?.length) {
      return this.getTableDictionaryByColumn(tableName, dictionaryColumnNames, selectColumnNames);
    }

    // proper validation missing!

    return this.tableService.getTableData(tableName, selectColumnNames);
  }

  async getTableDictionaryByColumn(tableName: string, dictionaryColumnNames: string[], selectColumnNames: string[] = []) {
    const validatedMetadata = await this.databaseMetadataService.getColumnNames(tableName, [
      ...dictionaryColumnNames,
      ...selectColumnNames,
    ]);

    if (!validatedMetadata) {
      throw new TableNotFoundException(`table ${tableName} not found`);
    }

    const validatedDictionaryColumnNames = validatedMetadata.columnNames.filter((name) => dictionaryColumnNames.includes(name));
    const validatedSelectColumnNames = validatedMetadata.columnNames.filter((name) => selectColumnNames.includes(name));
    if (validatedDictionaryColumnNames.length !== dictionaryColumnNames.length) {
      throw new ColumnNotFoundException(`Not all dictionary column ${dictionaryColumnNames} were found`);
    }
    if (validatedSelectColumnNames.length !== selectColumnNames.length) {
      throw new ColumnNotFoundException(`Not all selected columns ${selectColumnNames} were found`);
    }

    return this.tableService.getTableDataDictionaryByColumn(
      tableName,
      validatedDictionaryColumnNames,
      validatedSelectColumnNames,
    );
  }
}
