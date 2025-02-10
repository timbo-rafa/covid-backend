import { Injectable, Logger } from '@nestjs/common';
import { TableRepository } from './table.repository';
import { DataDictionaryDTO, DataDictionaryQueryInput, DataDTO, DataQueryInput, DatasetConfig } from './table';
import { DownsamplingMethod } from './table.dto';
import { DownsamplingTableRepository } from './downsampling-table.repository';
import { isDefined } from 'class-validator';
import { filterOutNullOrUndefinedColumns, mapJsDateToUnixTimestamp } from 'src/utils/row-transforms';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly downsamplingTableRepository: DownsamplingTableRepository,
  ) {}

  async getDistinctColumnValues<ColumnType>(tableName: string, columnName: string) {
    return this.tableRepository.getDistinctColumnValues<ColumnType>(tableName, columnName);
  }

  async getTableData(datasetConfig: DatasetConfig, tableQueryInput: DataQueryInput): Promise<DataDTO> {
    const entities = tableQueryInput.downsamplingMethod
      ? await this.getDownsampledTableData(datasetConfig, tableQueryInput)
      : await this.tableRepository.getTableData(datasetConfig, tableQueryInput.selectColumnNames);

    const transformedData = entities.map(filterOutNullOrUndefinedColumns).map(mapJsDateToUnixTimestamp);

    const { mostRecentTimestamp, timestamps } = this.reduceToTimestamps(datasetConfig, transformedData);

    return {
      data: transformedData,
      mostRecentTimestamp,
      timestamps,
    };
  }

  private async getDownsampledTableData(datasetConfig: DatasetConfig, tableQueryInput: DataQueryInput) {
    const { downsamplingMethod, selectColumnNames } = tableQueryInput;
    if (downsamplingMethod === DownsamplingMethod.LatestMonthly) {
      return this.downsamplingTableRepository.getLatestMonthlyDataPoints(datasetConfig, selectColumnNames);
    }

    this.logger.warn(
      `downsampling method ${downsamplingMethod} not implemented, defaulting to ${DownsamplingMethod.LatestMonthly}`,
    );
    return this.downsamplingTableRepository.getLatestMonthlyDataPoints(datasetConfig, selectColumnNames);
  }

  private reduceToTimestamps<DataType>(datasetConfig: DatasetConfig, data: DataType[]) {
    const timestamps = Array.from(
      new Set(data.map((row) => row[datasetConfig.timeColumnName]).filter((timestamp) => typeof timestamp === 'number')),
    ).sort((d1, d2) => d1 - d2);

    const mostRecentTimestamp = timestamps[0];

    return { mostRecentTimestamp, timestamps };
  }

  async getTableDataDictionaryByColumn(
    datasetConfig: DatasetConfig,
    queryInput: DataDictionaryQueryInput,
  ): Promise<DataDictionaryDTO> {
    const { dictionaryColumnNames, selectColumnNames = [], downsamplingMethod } = queryInput;
    const { data, mostRecentTimestamp, timestamps } = await this.getTableData(datasetConfig, {
      selectColumnNames: [...dictionaryColumnNames, ...selectColumnNames],
      downsamplingMethod,
    });

    const [firstGroupBy, secondGroupBy] = dictionaryColumnNames;

    const tableDictionaryByColumn = Object.groupBy(data, (dataRow) => dataRow[firstGroupBy]);

    if (!secondGroupBy) {
      return {
        dataDictionary: tableDictionaryByColumn,
        mostRecentTimestamp,
        timestamps,
      };
    }

    const tableDictionaryByTwoColumns: Partial<
      Record<string | number, Partial<Record<string | number, Record<string | number, string | number>[]>>>
    > = {};
    for (const firstKey in tableDictionaryByColumn) {
      const dataInFirstKey = tableDictionaryByColumn[firstKey];

      tableDictionaryByTwoColumns[firstKey] = {};
      if (!dataInFirstKey) {
        continue;
      }

      const dataInFirstKeyGroupedBySecondKey = Object.groupBy(dataInFirstKey, (dataRow) => dataRow[secondGroupBy]);

      tableDictionaryByTwoColumns[firstKey] = dataInFirstKeyGroupedBySecondKey;
    }

    return {
      dataDictionary: tableDictionaryByTwoColumns,
      mostRecentTimestamp,
      timestamps,
    };
  }
}
