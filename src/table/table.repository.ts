import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatasetConfig } from './table';

@Injectable()
export class TableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getDistinctColumnValues<ColumnType>(tableName: string, columnName: string) {
    const sql = `SELECT ARRAY_AGG(DISTINCT "${columnName}") AS "arrayAgg" FROM ${tableName} WHERE "${columnName}" IS NOT NULL`;
    const columnValues =  await this.prismaService.$queryRawUnsafe<[{arrayAgg: ColumnType[]}]>(sql);

    return columnValues[0]?.arrayAgg || []
  }

  getTableData(
    datasetConfig: DatasetConfig,
    selectColumnNames?: string[],
  ): Prisma.PrismaPromise<Record<string, string | number | Date | null | undefined>[]> {
    const { tableName, timeColumnName } = datasetConfig;
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
