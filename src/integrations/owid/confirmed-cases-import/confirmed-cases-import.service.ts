import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { csvColumnNumberByColumnName } from "../column-numbers";
import { OwidConfirmedCasesCreateModel } from "./confirmed-cases-import.models";
import { ConfirmedCasesImportRepository } from "./confirmed-cases-import.repository";
import { CountryIdByIso } from "../owid-data-import.models";
import { stringYYYYMMDDToDate } from "@utils";

@Injectable()
export class ConfirmedCasesImportService {
  private readonly logger = new Logger(ConfirmedCasesImportService.name)

  constructor(private readonly confirmedCasesImportRepository: ConfirmedCasesImportRepository) {}

  convertOwidDataRow(csvRow: string[], countryIdByIso: CountryIdByIso): OwidConfirmedCasesCreateModel {
    const { isoCode, date, newCases, totalCases } = csvColumnNumberByColumnName
    const incomingCsvCountryIso = csvRow[isoCode]
    const countryId = countryIdByIso[incomingCsvCountryIso]
    if (countryId === undefined) {
      this.logger.warn(`iso code ${incomingCsvCountryIso} on incoming csv not found on database. Skipping...`);
      return null
    }

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      newCases: Number(csvRow[newCases]),
      totalCases: Number(csvRow[totalCases])
    }
  }

  saveConfirmedCases(confirmedCases: OwidConfirmedCasesCreateModel[]) {
    return this.confirmedCasesImportRepository.saveConfirmedCases(confirmedCases)
  }
}