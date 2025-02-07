import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatasetConfig } from './table';

@Injectable()
export class TableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getTableData(
    datasetConfig: DatasetConfig,
    selectColumnNames?: string[],
  ): Prisma.PrismaPromise<Record<string, string | number | Date | null | undefined>[]> {
    const {tableName, timeColumnName} = datasetConfig
    const selectColumns = selectColumnNames?.join() || '*';

    const where = selectColumnNames
      ? 'WHERE ' + selectColumnNames.map((columnName) => `${columnName} IS NOT NULL`).join(' AND ')
      : '';

    const sql = `
      SELECT ${selectColumns} FROM ${tableName}
      ${where}
      ORDER BY "${timeColumnName}" DESC
      `;
    return this.prismaService.$queryRawUnsafe(sql);
  }
}
