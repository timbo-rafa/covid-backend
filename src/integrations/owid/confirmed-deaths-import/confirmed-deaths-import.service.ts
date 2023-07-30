import { Injectable, Logger } from '@nestjs/common';
import { csvColumnNumberByColumnName } from '../column-numbers';
import { CountryIdByIso } from '../owid-data-import.models';
import { stringYYYYMMDDToDate } from '@utils';
import { ConfirmedDeathsCreateModel } from './confirmed-deaths-import.models';
import { ConfirmedDeathsImportRepository } from './confirmed-deaths-import.repository';

@Injectable()
export class ConfirmedDeathsImportService {
  constructor(private readonly confirmedDeathsImportRepository: ConfirmedDeathsImportRepository) {}

  convertOwidDataRow(csvRow: string[], countryId: number): ConfirmedDeathsCreateModel {
    const { date, newDeaths, totalDeaths } = csvColumnNumberByColumnName;

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      newDeaths: csvRow[newDeaths] !== undefined ? Number(csvRow[newDeaths]) : undefined,
      totalDeaths: csvRow[totalDeaths] !== undefined ? Number(csvRow[totalDeaths]) : undefined,
    };
  }

  saveConfirmedDeaths(confirmedDeaths: ConfirmedDeathsCreateModel[]) {
    return this.confirmedDeathsImportRepository.saveConfirmedDeaths(confirmedDeaths);
  }
}
