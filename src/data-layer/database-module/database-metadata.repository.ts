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

  async getColumnNames(tableName: string, columnNames: string[]) {
    const columnMetadata = await this.prismaService.$queryRawTyped(getTableColumnName(tableName, columnNames));

    if (columnMetadata.length > 0) {
      const { tableName } = columnMetadata[0];
      const columnNames = columnMetadata.map((metadata) => metadata.columnName).filter((name) => name !== null);

      if (tableName) {
        return { tableName, columnNames };
      }
    }

    return null;
  }
}
