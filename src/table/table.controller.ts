import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { TableService } from './table.service';
import { ColumnNotFoundException, TableNotFoundException } from 'src/exceptions';
import { DataDictionaryQueryInput, DatasetConfig } from './table';
import { DataQueryGetRequest } from './table.dto';
import { MetadataService } from 'src/metadata';

@Controller('/tables')
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly metadataService: MetadataService,
  ) {}

  @Get(':tableName/columns')
  getTableColumns(@Param('tableName') tableName: string) {
    return this.metadataService.getColumnNames(tableName);
  }

  @Get(':tableName')
  getTable(@Param('tableName') tableName: string, @Query() queryParams: DataQueryGetRequest) {
    const { dictionaryColumnNames, selectColumnNames = [], timeColumnName, downsamplingMethod } = queryParams;
    const datasetConfig: DatasetConfig = { timeColumnName, tableName };
    if (dictionaryColumnNames?.length) {
      return this.getTableDictionaryByColumn(datasetConfig, { dictionaryColumnNames, selectColumnNames, downsamplingMethod });
    }

    // proper validation missing!

    return this.tableService.getTableData(datasetConfig, { selectColumnNames, downsamplingMethod });
  }

  async getTableDictionaryByColumn(datasetConfig: DatasetConfig, queryInput: DataDictionaryQueryInput) {
    const { dictionaryColumnNames, selectColumnNames = [] } = queryInput;
    const validatedMetadata = await this.metadataService.validateColumnNames(datasetConfig.tableName, [
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
