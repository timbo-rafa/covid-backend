import { Injectable, Logger } from '@nestjs/common';
import { TableRepository } from './table.repository';
import { convertJsDatesToUnixTimestamp } from '@utils';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(private readonly tableRepository: TableRepository) {}

  async getTableData(tableName: string, selectColumnNames?: string[]) {
    const data = await this.tableRepository.getTableData(tableName, selectColumnNames);

    return convertJsDatesToUnixTimestamp(data);
  }

  async getTableDataDictionaryByColumn(tableName: string, dictionaryColumnNames: string[], selectColumnNames: string[] = []) {
    const tableData = await this.getTableData(tableName, [...dictionaryColumnNames, ...selectColumnNames]);

    const [firstGroupBy, secondGroupBy] = dictionaryColumnNames;

    const tableDictionaryByColumn = Object.groupBy(tableData, (dataRow) => dataRow[firstGroupBy]);

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

      return tableDictionaryByTwoColumns;
    }

    return tableDictionaryByColumn;
  }
}
