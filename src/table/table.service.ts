import { Injectable, Logger } from '@nestjs/common';
import { TableRepository } from './table.repository';
import { convertJsDatesToUnixTimestamp } from '@utils';
import { DataDictionaryDTO, DataDictionaryQueryInput, DataDTO, DataQueryInput, DatasetConfig } from './table';
import { DownsamplingMethod } from './table.dto';
import { DownsamplingTableRepository } from './downsampling-table.repository';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly downsamplingTableRepository: DownsamplingTableRepository,
  ) {}

  async getTableData(datasetConfig: DatasetConfig, tableQueryInput: DataQueryInput): Promise<DataDTO> {
    const data = tableQueryInput.downsamplingMethod
      ? await this.getDownsampledTableData(datasetConfig, tableQueryInput)
      : await this.tableRepository.getTableData(datasetConfig.tableName, tableQueryInput.selectColumnNames);

    const dataWithUnixTimestamps = convertJsDatesToUnixTimestamp(data);

    const mostRecentTimestamp = this.calculateMostRecentTimestamp(datasetConfig, dataWithUnixTimestamps);

    return {
      data: dataWithUnixTimestamps,
      mostRecentTimestamp,
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

  private calculateMostRecentTimestamp<DataType>(datasetConfig: DatasetConfig, data: DataType[]): number | null {
    const timestamps = data.map((dataRow) => dataRow[datasetConfig.timeColumnName]);

    let mostRecentTime: number = -Infinity;

    for (const timestamp of timestamps) {
      if (typeof timestamp === 'number' && timestamp > mostRecentTime) {
        mostRecentTime = timestamp;
      }
    }

    return mostRecentTime === -Infinity ? null : mostRecentTime;
  }

  async getTableDataDictionaryByColumn(
    datasetConfig: DatasetConfig,
    queryInput: DataDictionaryQueryInput,
  ): Promise<DataDictionaryDTO> {
    const { dictionaryColumnNames, selectColumnNames = [], downsamplingMethod } = queryInput;
    const { data, mostRecentTimestamp } = await this.getTableData(datasetConfig, {
      selectColumnNames: [...dictionaryColumnNames, ...selectColumnNames],
      downsamplingMethod,
    });

    const [firstGroupBy, secondGroupBy] = dictionaryColumnNames;

    const tableDictionaryByColumn = Object.groupBy(data, (dataRow) => dataRow[firstGroupBy]);

    if (secondGroupBy) {
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
      };
    }

    return {
      dataDictionary: tableDictionaryByColumn,
      mostRecentTimestamp,
    };
  }
}
