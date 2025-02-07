import { Injectable } from '@nestjs/common';
import { ColumnNotFoundException, TableNotFoundException } from 'src/exceptions';
import { MetadataService } from 'src/metadata';

@Injectable()
export class TableValidator {
  constructor(private readonly metadataService: MetadataService) {}

  async validateTableAndColumnNames(tableName: string, columnNames: string[]) {
    const validatedMetadata = await this.metadataService.validateColumnNames(tableName, columnNames);

    if (!validatedMetadata) {
      throw new TableNotFoundException(`table ${tableName} not found`);
    }

    if (validatedMetadata.columnNames.length !== columnNames.length) {
      const missingColumnNames = columnNames.filter((columnName) => !validatedMetadata.columnNames.includes(columnName));
      throw new ColumnNotFoundException(`Columns ${missingColumnNames.join()} were not found`);
    }

    return validatedMetadata;
  }
}
