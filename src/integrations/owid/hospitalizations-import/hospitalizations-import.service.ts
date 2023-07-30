import { Injectable } from '@nestjs/common';
import { stringYYYYMMDDToDate } from '@utils';
import { csvColumnNumberByColumnName } from '../column-numbers';
import { HospitalizationsCreateModel } from './hospitalizations-import.models';
import { HospitalizationsImportRepository } from './hospitalizations-import.repository';

@Injectable()
export class HospitalizationsImportService {
  constructor(private readonly hospitalizationsImportRepository: HospitalizationsImportRepository) {}

  convertOwidDataRow(csvRow: string[], countryId: number): HospitalizationsCreateModel {
    const { date, icuPatients, hospPatients, weeklyHospAdmissions, weeklyIcuAdmissions } = csvColumnNumberByColumnName;

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      icuPatients: csvRow[icuPatients] !== undefined ? Number(csvRow[icuPatients]) : undefined,
      hospPatients: csvRow[hospPatients] !== undefined ? Number(csvRow[hospPatients]) : undefined,
      weeklyHospAdmissions: csvRow[weeklyHospAdmissions] !== undefined ? Number(csvRow[weeklyHospAdmissions]) : undefined,
      weeklyIcuAdmissions: csvRow[weeklyIcuAdmissions] !== undefined ? Number(csvRow[weeklyIcuAdmissions]) : undefined,
    };
  }

  saveHospitalizations(hospitalizations: HospitalizationsCreateModel[]) {
    return this.hospitalizationsImportRepository.saveHospitalizations(hospitalizations);
  }
}
