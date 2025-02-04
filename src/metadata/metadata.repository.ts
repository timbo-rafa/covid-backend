import { PrismaService } from '../data-layer/database-module/prisma.service';
import { Injectable } from '@nestjs/common';
import { validateTableColumnNames, getTableName, getTableColumnNames } from '@prisma/client/sql';

@Injectable()
export class MetadataRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getTableName(tableName: string) {
    const tableMetadata = await this.prismaService.$queryRawTyped(getTableName(tableName));

    return tableMetadata;
  }

  async getColumnNames(tableName: string) {
    const columnMetadata = await this.prismaService.$queryRawTyped(getTableColumnNames(tableName));
    return columnMetadata;
  }

  async validateColumnNames(tableName: string, columnNames: string[]) {
    const columnMetadata = await this.prismaService.$queryRawTyped(validateTableColumnNames(tableName, columnNames));

    return columnMetadata;
  }
}
