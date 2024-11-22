import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getTableData<DataType = unknown>(tableName: string): Prisma.PrismaPromise<DataType[]> {
    // check if table exists before
    const tableColumns = '*';
    return this.prismaService.$queryRawUnsafe(`
      SELECT ${tableColumns} FROM ${tableName}
      LIMIT 1000
      `);
  }
}
