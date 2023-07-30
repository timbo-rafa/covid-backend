import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { ConfirmedCasesImportRepository } from './confirmed-cases-import/confirmed-cases-import.repository';
import { ConfirmedCasesImportService } from './confirmed-cases-import/confirmed-cases-import.service';
import { ConfirmedDeathsImportRepository } from './confirmed-deaths-import/confirmed-deaths-import.repository';
import { ConfirmedDeathsImportService } from './confirmed-deaths-import/confirmed-deaths-import.service';
import { CovidTestsImportRepository } from './covid-tests-import/covid-tests-import.repository';
import { CovidTestsImportService } from './covid-tests-import/covid-tests-import.service';
import { HospitalizationsImportRepository } from './hospitalizations-import/hospitalizations-import.repository';
import { HospitalizationsImportService } from './hospitalizations-import/hospitalizations-import.service';
import { OwidDataImportController } from './owid-data-import.controller';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { OwidDataImportService } from './owid-data-import.service';
import { VaccinationsImportRepository } from './vaccinations-import/vaccinations-import.repository';
import { VaccinationsImportService } from './vaccinations-import/vaccinations-import.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OwidDataImportController],
  providers: [
    OwidDataImportService,
    OwidDataImportRepository,
    ConfirmedCasesImportService,
    ConfirmedCasesImportRepository,
    ConfirmedDeathsImportService,
    ConfirmedDeathsImportRepository,
    HospitalizationsImportService,
    HospitalizationsImportRepository,
    VaccinationsImportService,
    VaccinationsImportRepository,
    CovidTestsImportService,
    CovidTestsImportRepository,
  ],
  exports: [OwidDataImportService],
})
export class OwidDataImportModule {}
