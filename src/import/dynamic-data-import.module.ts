import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { DynamicDataImportService } from './dynamic-data-import.service';
import { DynamicDataImportRepository } from './dynamic-data-import.repository';
import { DynamicDataImportController } from './dynamic-data-import.controller';
import { MetadataModule } from 'src/metadata';

@Module({
  imports: [DatabaseModule, MetadataModule],
  controllers: [DynamicDataImportController],
  providers: [DynamicDataImportService, DynamicDataImportRepository],
  exports: [DynamicDataImportService],
})
export class DynamicDataImportModule {}
