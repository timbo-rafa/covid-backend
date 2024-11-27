import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DatabaseMetadataRepository } from './database-metadata.repository';
import { DatabaseMetadataService } from './database-metadata.service';

@Module({
  imports: [],
  providers: [PrismaService, DatabaseMetadataService, DatabaseMetadataRepository],
  exports: [PrismaService, DatabaseMetadataService],
})
export class DatabaseModule {}
