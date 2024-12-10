import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatasetConfig } from './table';

@Injectable()
export class DownsamplingTableRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getLatestMonthlyDataPoints(
    datasetConfig: DatasetConfig,
    selectColumnNames?: string[],
  ): Prisma.PrismaPromise<Record<string, string | number | Date | null | undefined>[]> {
    const {tableName, timeColumnName} = datasetConfig;
    const selectColumns = selectColumnNames?.join() || '*';

    const where = selectColumnNames
      ? 'WHERE ' + selectColumnNames.map((columnName) => `${columnName} IS NOT NULL`).join(' AND ')
      : '';

    const sql = `
      SELECT DISTINCT ON (code, EXTRACT(YEAR from "${timeColumnName}"), EXTRACT(MONTH FROM "${timeColumnName}"))
        ${selectColumns}
      FROM public.covid
      ${where}
      ORDER BY code, EXTRACT(YEAR from "${timeColumnName}"), EXTRACT(MONTH from "${timeColumnName}"), ${timeColumnName} DESC
      `;
    return this.prismaService.$queryRawUnsafe(sql);
  }
}
