import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { getTableColumnNames } from '@prisma/client/sql';

@Injectable()
export class DatabaseMetadataRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getColumnNames(tableName: string) {
    const columnMetadata = await this.prismaService.$queryRawTyped(getTableColumnNames(tableName));

    return columnMetadata.map(({ column_name }) => column_name);
  }
}
