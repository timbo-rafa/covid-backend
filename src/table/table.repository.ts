import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getTableData(
    tableName: string,
    selectColumnNames?: string[],
  ): Prisma.PrismaPromise<Record<string, string | number | Date | null | undefined>[]> {
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
