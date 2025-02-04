import { Injectable } from '@nestjs/common';
import { DatabaseMetadataService } from 'src/data-layer/database-module';
import { ColumnNotFoundException, TableNotFoundException } from 'src/exceptions';

@Injectable()
export class TableValidator {
  constructor(private readonly databaseMetadataService: DatabaseMetadataService) {}

  async validateTableAndColumnNames(tableName: string, columnNames: string[]) {
    const validatedMetadata = await this.databaseMetadataService.validateColumnNames(tableName, columnNames);

    if (!validatedMetadata) {
      throw new TableNotFoundException(`table ${tableName} not found`);
    }

    if (validatedMetadata.columnNames.length !== columnNames.length) {
      throw new ColumnNotFoundException(`Not all selected columns ${columnNames} were found`);
    }

    return validatedMetadata;
  }
}
