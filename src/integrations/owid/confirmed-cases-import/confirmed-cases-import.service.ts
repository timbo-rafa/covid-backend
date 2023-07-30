import { Injectable } from '@nestjs/common';
import { stringYYYYMMDDToDate } from '@utils';
import { csvColumnNumberByColumnName } from '../column-numbers';
import { ConfirmedCasesCreateModel } from './confirmed-cases-import.models';
import { ConfirmedCasesImportRepository } from './confirmed-cases-import.repository';

@Injectable()
export class ConfirmedCasesImportService {
  constructor(private readonly confirmedCasesImportRepository: ConfirmedCasesImportRepository) {}

  convertOwidDataRow(csvRow: string[], countryId: number): ConfirmedCasesCreateModel {
    const { date, newCases, totalCases } = csvColumnNumberByColumnName;

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      newCases: csvRow[newCases] !== undefined ? Number(csvRow[newCases]) : undefined,
      totalCases: csvRow[totalCases] !== undefined ? Number(csvRow[totalCases]) : undefined,
    };
  }

  saveConfirmedCases(confirmedCases: ConfirmedCasesCreateModel[]) {
    return this.confirmedCasesImportRepository.saveConfirmedCases(confirmedCases);
  }
}
