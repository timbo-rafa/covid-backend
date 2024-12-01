import { Injectable, Logger } from '@nestjs/common';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(private readonly tableRepository: TableRepository) {}

  getTableData(tableName: string, selectColumnNames?: string[]) {
    return this.tableRepository.getTableData(tableName, selectColumnNames);
  }

  async getTableDataDictionaryByColumn(tableName: string, dictionaryColumnNames: string[], selectColumnNames: string[] = []) {
    const tableData = await this.getTableData(tableName, [...dictionaryColumnNames, ...selectColumnNames]);

    const [firstGroupBy, secondGroupBy] = dictionaryColumnNames;

    const tableDictionaryByColumn = Object.groupBy(tableData, (dataRow) => dataRow[firstGroupBy]);

    if (secondGroupBy) {
      const tableDictionaryByTwoColumns: Partial<
        Record<string | number, Partial<Record<string | number, Record<string | number, string | number>[]>>>
      > = {};
      for (const key in tableDictionaryByColumn) {
        const firstGroupByData = tableDictionaryByColumn[key];

        tableDictionaryByTwoColumns[key] = {};
        if (!firstGroupByData) {
          continue;
        }

        const secondGroupByData = Object.groupBy(firstGroupByData, (dataRow) => dataRow[secondGroupBy]);

        tableDictionaryByTwoColumns[key] = secondGroupByData;
      }

      return tableDictionaryByTwoColumns;
    }

    return tableDictionaryByColumn;
  }
}
