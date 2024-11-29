import { Injectable, Logger } from '@nestjs/common';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(private readonly tableRepository: TableRepository) {}

  getTableData(tableName: string, selectColumnNames?: string[]) {
    return this.tableRepository.getTableData(tableName, selectColumnNames);
  }

  async getTableDataDictionaryByColumn(tableName: string, dictionaryColumnName: string, selectColumnNames: string[] = []) {
    const tableData = await this.getTableData(tableName, [dictionaryColumnName, ...selectColumnNames]);

    const tableDictionaryByColumn = Object.groupBy(tableData, (dataRow) => dataRow[dictionaryColumnName]);
    return tableDictionaryByColumn;
  }
}
