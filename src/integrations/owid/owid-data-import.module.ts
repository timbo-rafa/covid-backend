import { Module } from '@nestjs/common';
import { OwidDataImportService } from './owid-data-import.service';
import { OwidDataImportController } from './owid-data-import.controller';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { DatabaseModule } from '@data-layer';


@Module({
  imports: [DatabaseModule],
  controllers: [OwidDataImportController],
  providers: [OwidDataImportService, OwidDataImportRepository],
  exports: [OwidDataImportService],
})
export class OwidDataImportModule { }
