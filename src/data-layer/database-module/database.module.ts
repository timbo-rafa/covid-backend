import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DatabaseMetadataRepository } from './database-metadata.repository';

@Module({
  imports: [],
  providers: [PrismaService, DatabaseMetadataRepository],
  exports: [PrismaService, DatabaseMetadataRepository],
})
export class DatabaseModule {}
