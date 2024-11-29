import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { TableService } from './table.service';
import { DatabaseMetadataService } from 'src/data-layer/database-module';
import { ColumnNotFoundException, TableNotFoundException } from 'src/exceptions';
import { TableValidator } from './table.validator';

@Controller('/tables')
export class TableController {
  constructor(private readonly tableService: TableService, private readonly databaseMetadataService: DatabaseMetadataService) {}

  @Get(':tableName')
  async getTable(
    @Param('tableName') tableName: string,
    @Query('dictionaryColumnName') dictionaryColumnName?: string,
    @Query('selectColumnName', new ParseArrayPipe({ items: String, separator: ',' })) selectColumnNames?: string[],
  ) {
    console.log(typeof selectColumnNames, JSON.stringify(selectColumnNames));
    if (dictionaryColumnName) {
      return this.getTableDictionaryByColumn(tableName, dictionaryColumnName, selectColumnNames);
    }

    // proper validation missing!

    return this.tableService.getTableData(tableName, selectColumnNames);
  }

  async getTableDictionaryByColumn(tableName: string, dictionaryColumnName: string, selectColumnNames: string[] = []) {
    const validatedMetadata = await this.databaseMetadataService.getColumnNames(tableName, [
      dictionaryColumnName,
      ...selectColumnNames,
    ]);

    if (!validatedMetadata) {
      throw new TableNotFoundException(`table ${tableName} not found`);
    }

    const validatedDictionaryColumnName = validatedMetadata.columnNames.find((name) => name === dictionaryColumnName);
    const validatedSelectColumnNames = validatedMetadata.columnNames.filter((name) => selectColumnNames.includes(name));
    if (!validatedDictionaryColumnName) {
      throw new ColumnNotFoundException(`Column ${dictionaryColumnName} not found`);
    }
    if (validatedSelectColumnNames.length !== selectColumnNames.length) {
      throw new ColumnNotFoundException(`Not all selected columns ${selectColumnNames} were found`);
    }

    return this.tableService.getTableDataDictionaryByColumn(tableName, validatedDictionaryColumnName, validatedSelectColumnNames);
  }
}
