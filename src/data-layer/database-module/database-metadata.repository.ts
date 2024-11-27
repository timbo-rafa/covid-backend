import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { getTableColumnName, getTableName } from '@prisma/client/sql';

@Injectable()
export class DatabaseMetadataRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getTableName(tableName: string): Promise<string | null> {
    const tableMetadata = await this.prismaService.$queryRawTyped(getTableName(tableName));

    if (tableMetadata.length > 0 && tableMetadata[0].tableName) {
      return tableMetadata[0].tableName;
    }

    return null;
  }

  async getColumnName(tableName: string, columnName: string) {
    const columnMetadata = await this.prismaService.$queryRawTyped(getTableColumnName(tableName, columnName));

    if (columnMetadata.length > 0) {
      const { tableName, columnName } = columnMetadata[0];

      if (tableName && columnName) {
        return { tableName, columnName };
      }
    }

    return null;
  }
}
