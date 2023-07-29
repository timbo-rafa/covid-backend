import { Injectable } from "@nestjs/common";
import { csvRowNumberByCountryIso } from "../column-numbers";
import { OwidConfirmedCasesCreateModel } from "./confirmed-cases-import.models";
import { PrismaService } from "@data-layer";
import { ConfirmedCasesImportRepository } from "./confirmed-cases-import.repository";

@Injectable()
export class ConfirmedCasesImportService {

  constructor(private readonly confirmedCasesImportRepository: ConfirmedCasesImportRepository) {}

  convertOwidDataRow(csvRow: string[]): OwidConfirmedCasesCreateModel {
    const { isoCode, date, newCases, totalCases } = csvRowNumberByCountryIso

    return {
      isoCode: csvRow[isoCode],
      date: csvRow[date],
      newCases: csvRow[newCases],
      totalCases: csvRow[totalCases]
    }
  }

  saveConfirmedCases(confirmedCases: OwidConfirmedCasesCreateModel[]) {
    return this.confirmedCasesImportRepository.confirmedCases(confirmedCases)
  }
}