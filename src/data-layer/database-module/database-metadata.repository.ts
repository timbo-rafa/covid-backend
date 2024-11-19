import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { getTableColumnNames } from '@prisma/client/sql';

@Injectable()
export class DatabaseMetadataRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getColumnNames(schemaName: string, tableName: string) {
    const columnMetadata = await this.prismaService.$queryRawTyped(getTableColumnNames(schemaName, tableName));

    return columnMetadata.map(({column_name}) => column_name)
  }
}
