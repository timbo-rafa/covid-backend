import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { ConfirmedCasesImportRepository } from './confirmed-cases-import/confirmed-cases-import.repository';
import { ConfirmedCasesImportService } from './confirmed-cases-import/confirmed-cases-import.service';
import { ConfirmedDeathsImportRepository } from './confirmed-deaths-import/confirmed-deaths-import.repository';
import { ConfirmedDeathsImportService } from './confirmed-deaths-import/confirmed-deaths-import.service';
import { OwidDataImportController } from './owid-data-import.controller';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { OwidDataImportService } from './owid-data-import.service';


@Module({
  imports: [DatabaseModule],
  controllers: [OwidDataImportController],
  providers: [OwidDataImportService, OwidDataImportRepository,
    ConfirmedCasesImportService, ConfirmedCasesImportRepository,
    ConfirmedDeathsImportService, ConfirmedDeathsImportRepository
  ],
  exports: [OwidDataImportService],
})
export class OwidDataImportModule { }
