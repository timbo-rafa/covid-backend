import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableRepository } from './table.repository';
import { TableController } from './table.controller';
import { DownsamplingTableRepository } from './downsampling-table.repository';
import { MetadataModule } from 'src/metadata/metadata.module';
import { TableValidator } from './table.validator';

@Module({
  controllers: [TableController],
  imports: [DatabaseModule, MetadataModule],
  providers: [TableValidator, TableService, TableRepository, DownsamplingTableRepository],
})
export class TableModule {}
