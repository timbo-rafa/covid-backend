import { Injectable } from "@nestjs/common";
import { stringYYYYMMDDToDate } from "@utils";
import { csvColumnNumberByColumnName } from "../column-numbers";
import { VaccinationsCreateModel } from "./vaccinations-import.models";
import { VaccinationsImportRepository } from "./vaccinations-import.repository";

@Injectable()
export class VaccinationsImportService {
  constructor(private readonly vaccinationsImportRepository: VaccinationsImportRepository) { }

  convertOwidDataRow(csvRow: string[], countryId: number): VaccinationsCreateModel {
    const {
      date,
      totalVaccinations,
      peopleVaccinated,
      peopleFullyVaccinated,
      totalBoosters,
      newVaccinations
    } = csvColumnNumberByColumnName

    return {
      countryId,
      date: stringYYYYMMDDToDate(csvRow[date]),
      totalVaccinations: csvRow[totalVaccinations] !== undefined ? Number(csvRow[totalVaccinations]) : undefined,
      peopleVaccinated: csvRow[peopleVaccinated] !== undefined ? Number(csvRow[peopleVaccinated]) : undefined,
      peopleFullyVaccinated: csvRow[peopleFullyVaccinated] !== undefined ? Number(csvRow[peopleFullyVaccinated]) : undefined,
      totalBoosters: csvRow[totalBoosters] !== undefined ? Number(csvRow[totalBoosters]) : undefined,
      newVaccinations: csvRow[newVaccinations] !== undefined ? Number(csvRow[newVaccinations]) : undefined,
    }
  }

  saveVaccinations(vaccinations: VaccinationsCreateModel[]) {
    return this.vaccinationsImportRepository.saveVaccinations(vaccinations)
  }
}