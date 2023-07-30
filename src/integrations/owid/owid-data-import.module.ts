import { Module } from '@nestjs/common';
import { OwidDataImportService } from './owid-data-import.service';
import { OwidDataImportController } from './owid-data-import.controller';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { DatabaseModule } from '@data-layer';
import { ConfirmedCasesImportService } from './confirmed-cases-import/confirmed-cases-import.service';
import { ConfirmedCasesImportRepository } from './confirmed-cases-import/confirmed-cases-import.repository';


@Module({
  imports: [DatabaseModule],
  controllers: [OwidDataImportController],
  providers: [OwidDataImportService, OwidDataImportRepository, ConfirmedCasesImportService, ConfirmedCasesImportRepository],
  exports: [OwidDataImportService],
})
export class OwidDataImportModule { }
