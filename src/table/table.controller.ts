import { Controller, Get, Param, Query } from '@nestjs/common';
import { TableService } from './table.service';
import { DataDictionaryQueryInput, DatasetConfig } from './table';
import { DataQueryGetRequest } from './table.dto';
import { MetadataService } from 'src/metadata';
import { TableValidator } from './table.validator';

@Controller('/tables')
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly metadataService: MetadataService,
    private readonly tableValidator: TableValidator,
  ) {}

  @Get(':tableName/columns/:columnName')
  async getColumnValues<ColumnType>(@Param('tableName') tableName: string, @Param('columnName') columnName: string) {
    await this.tableValidator.validateTableAndColumnNames(tableName, [columnName]);

    return this.tableService.getDistinctColumnValues<ColumnType>(tableName, columnName);
  }

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

    await this.tableValidator.validateTableAndColumnNames(datasetConfig.tableName, [...dictionaryColumnNames, ...selectColumnNames]);

    const dict = await this.tableService.getTableDataDictionaryByColumn(datasetConfig, queryInput);

    return dict;
  }
}
