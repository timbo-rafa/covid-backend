import { Injectable, Logger } from "@nestjs/common";
import { csvColumnNumberByColumnName } from "../column-numbers";
import { CountryIdByIso } from "../owid-data-import.models";
import { stringYYYYMMDDToDate } from "@utils";
import { OwidConfirmedDeathsCreateModel } from "./confirmed-deaths-import.models";
import { ConfirmedDeathsImportRepository } from "./confirmed-deaths-import.repository";

@Injectable()
export class ConfirmedDeathsImportService {
  constructor(private readonly confirmedDeathsImportRepository: ConfirmedDeathsImportRepository) { }

  convertOwidDataRow(csvRow: string[], countryId: number): OwidConfirmedDeathsCreateModel {
    const { date, newDeaths, totalDeaths } = csvColumnNumberByColumnName

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      newDeaths: Number(csvRow[newDeaths]),
      totalDeaths: Number(csvRow[totalDeaths])
    }
  }

  saveConfirmedDeaths(confirmedDeaths: OwidConfirmedDeathsCreateModel[]) {
    return this.confirmedDeathsImportRepository.saveConfirmedDeaths(confirmedDeaths)
  }
}