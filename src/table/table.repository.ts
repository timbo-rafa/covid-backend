import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getTableData<DataType = Record<string, string | number>>(
    tableName: string,
    selectColumnNames?: string[],
  ): Prisma.PrismaPromise<DataType[]> {
    const selectColumns = selectColumnNames?.join() || '*';

    const where = selectColumnNames
      ? 'WHERE ' + selectColumnNames.map((columnName) => `${columnName} IS NOT NULL`).join(' AND ')
      : '';

    const sql = `
      SELECT ${selectColumns} FROM ${tableName}
      ${where}
      `;
    return this.prismaService.$queryRawUnsafe(sql);
  }
}
