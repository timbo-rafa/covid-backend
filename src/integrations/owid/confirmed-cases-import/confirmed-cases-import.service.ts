import { Injectable } from "@nestjs/common";
import { stringYYYYMMDDToDate } from "@utils";
import { csvColumnNumberByColumnName } from "../column-numbers";
import { OwidConfirmedCasesCreateModel } from "./confirmed-cases-import.models";
import { ConfirmedCasesImportRepository } from "./confirmed-cases-import.repository";

@Injectable()
export class ConfirmedCasesImportService {
  constructor(private readonly confirmedCasesImportRepository: ConfirmedCasesImportRepository) {}

  convertOwidDataRow(csvRow: string[], countryId: number): OwidConfirmedCasesCreateModel {
    const { date, newCases, totalCases } = csvColumnNumberByColumnName
    
    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      newCases: Number(csvRow[newCases]),
      totalCases: Number(csvRow[totalCases]) || 0
    }
  }

  saveConfirmedCases(confirmedCases: OwidConfirmedCasesCreateModel[]) {
    return this.confirmedCasesImportRepository.saveConfirmedCases(confirmedCases)
  }
}