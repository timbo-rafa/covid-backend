import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getTableData<DataType = Record<string, string | number>>(tableName: string): Prisma.PrismaPromise<DataType[]> {
    const tableColumns = '*';
    return this.prismaService.$queryRawUnsafe(`
      SELECT ${tableColumns} FROM ${tableName}
      ORDER BY date ASC
      LIMIT 1000
      `);
  }
}
