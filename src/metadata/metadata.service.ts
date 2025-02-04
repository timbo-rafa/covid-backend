import { Injectable } from '@nestjs/common';
import { MetadataRepository as MetadataRepository } from './metadata.repository';
import postgresToJsType from '../data-layer/database-module/postgresql-to-js-type';

@Injectable()
export class MetadataService {
  constructor(private readonly metadataRepository: MetadataRepository) {}

  async getTableName(tableName: string): Promise<string | null> {
    const tableMetadata = await this.metadataRepository.getTableName(tableName);

    if (tableMetadata.length > 0 && tableMetadata[0].tableName) {
      return tableMetadata[0].tableName;
    }

    return null;
  }

  async getColumnNames(tableName: string) {
    const columnMetadata = await this.metadataRepository.getColumnNames(tableName);
    return columnMetadata.map((metadata) => ({
      ...metadata,
      dataType: metadata.dataType ? postgresToJsType[metadata.dataType] || metadata.dataType : null,
    }));
  }

  async validateColumnNames(tableName: string, columnNames: string[]) {
    const columnMetadata = await this.metadataRepository.validateColumnNames(tableName, columnNames);

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
