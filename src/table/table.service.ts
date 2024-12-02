import { Injectable, Logger } from '@nestjs/common';
import { TableRepository } from './table.repository';
import { convertJsDatesToUnixTimestamp } from '@utils';
import { DataDictionaryDTO, DataDictionaryQueryInput, DataDTO, DatasetConfig } from './table';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(private readonly tableRepository: TableRepository) {}

  async getTableData(datasetConfig: DatasetConfig, selectColumnNames: string[]): Promise<DataDTO> {
    const data = await this.tableRepository.getTableData(datasetConfig.tableName, selectColumnNames);

    const dataWithUnixTimestamps = convertJsDatesToUnixTimestamp(data);

    const mostRecentTimestamp = this.calculateMostRecentTimestamp(datasetConfig, dataWithUnixTimestamps);

    return {
      data: dataWithUnixTimestamps,
      mostRecentTimestamp,
    };
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
    const { dictionaryColumnNames, selectColumnNames = [] } = queryInput;
    const { data, mostRecentTimestamp } = await this.getTableData(
      datasetConfig,
      [...dictionaryColumnNames, ...selectColumnNames],
    );

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
