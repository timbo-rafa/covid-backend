import { Injectable } from '@nestjs/common';
import { TableRepository } from './table.repository';
import { groupBy } from 'lodash';

@Injectable()
export class TableService {
  constructor(private readonly tableRepository: TableRepository) {}

  getTableData(tableName: string) {
    return this.tableRepository.getTableData(tableName);
  }

  async getTableDataDictionaryByColumn(tableName: string, columnName: string) {
    const tableData = await this.getTableData(tableName);

    const tableDictionaryByColumn = groupBy(tableData, columnName);

    return tableDictionaryByColumn;
  }
}
