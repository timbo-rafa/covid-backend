import { Controller, Get, Query } from '@nestjs/common';
import { TableService } from './table.service';

@Controller('/table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getTable(@Query('tableName') tableName: string) {
    return this.tableService.getTableData(tableName);
  }
}
