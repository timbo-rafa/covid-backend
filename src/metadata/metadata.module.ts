import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';
import { MetadataService } from './metadata.service';

@Module({
  imports: [DatabaseModule],
  providers: [MetadataService, MetadataRepository],
  exports: [MetadataService],
})
export class MetadataModule {}
