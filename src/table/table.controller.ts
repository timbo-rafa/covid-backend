import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { TableService } from './table.service';
import { DatabaseMetadataService } from 'src/data-layer/database-module';
import { ColumnNotFoundException, TableNotFoundException } from 'src/exceptions';
import { DataDictionaryQueryInput, DatasetConfig } from './table';
import { DataQueryGetRequest } from './table.dto';

@Controller('/tables')
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly databaseMetadataService: DatabaseMetadataService,
  ) {}

  @Get(':tableName')
  getTable(
    @Param('tableName') tableName: string,
    @Query() queryParams: DataQueryGetRequest,
    //@Query('dictionaryColumnNames', new ParseArrayPipe({ items: String, separator: ',' })) dictionaryColumnNames?: string[],
    //@Query('selectColumnNames', new ParseArrayPipe({ items: String, separator: ',' })) selectColumnNames?: string[],
  ) {
    const { dictionaryColumnNames, selectColumnNames = [], timeColumnName } = queryParams;
    const datasetConfig: DatasetConfig = { timeColumnName, tableName };
    if (dictionaryColumnNames?.length) {
      return this.getTableDictionaryByColumn(datasetConfig, { dictionaryColumnNames, selectColumnNames });
    }

    // proper validation missing!

    return this.tableService.getTableData(datasetConfig, selectColumnNames);
  }

  async getTableDictionaryByColumn(datasetConfig: DatasetConfig, queryInput: DataDictionaryQueryInput) {
    const { dictionaryColumnNames, selectColumnNames = [] } = queryInput;
    const validatedMetadata = await this.databaseMetadataService.getColumnNames(datasetConfig.tableName, [
      ...dictionaryColumnNames,
      ...selectColumnNames,
    ]);

    if (!validatedMetadata) {
      throw new TableNotFoundException(`table ${datasetConfig.tableName} not found`);
    }

    const specifiedColumnNames = [...dictionaryColumnNames, ...selectColumnNames];
    if (specifiedColumnNames.length !== validatedMetadata.columnNames.length) {
      const missingColumnNames = specifiedColumnNames.filter((columnName) => !validatedMetadata.columnNames.includes(columnName));
      throw new ColumnNotFoundException(`Columns ${missingColumnNames.join()} were not found`);
    }

    const dict = await this.tableService.getTableDataDictionaryByColumn(datasetConfig, queryInput);

    return dict;
  }
}
