import { Injectable } from '@nestjs/common';
import { stringYYYYMMDDToDate } from '@utils';
import { csvColumnNumberByColumnName } from '../column-numbers';
import { CovidTestsCreateModel } from './covid-tests-import.models';
import { CovidTestsImportRepository } from './covid-tests-import.repository';

@Injectable()
export class CovidTestsImportService {
  constructor(private readonly covidTestsImportRepository: CovidTestsImportRepository) {}

  convertOwidDataRow(csvRow: string[], countryId: number): CovidTestsCreateModel {
    const { date, totalTests, newTests, positiveRate, testsPerCase } = csvColumnNumberByColumnName;

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      totalTests: csvRow[totalTests] !== undefined ? Number(csvRow[totalTests]) : undefined,
      newTests: csvRow[newTests] !== undefined ? Number(csvRow[newTests]) : undefined,
      positiveRate: csvRow[positiveRate] !== undefined ? Number(csvRow[positiveRate]) : undefined,
      testsPerCase: csvRow[testsPerCase] !== undefined ? Number(csvRow[testsPerCase]) : undefined,
    };
  }

  saveCovidTests(covidTests: CovidTestsCreateModel[]) {
    return this.covidTestsImportRepository.saveCovidTests(covidTests);
  }
}
