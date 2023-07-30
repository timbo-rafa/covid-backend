import { Injectable, Logger } from '@nestjs/common';
import * as csvParse from 'csv-parse';
import * as https from 'https';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { ConfirmedCasesImportService } from './confirmed-cases-import/confirmed-cases-import.service';
import { ConfirmedCasesCreateModel } from './confirmed-cases-import/confirmed-cases-import.models';
import { CountryIdByIso } from './owid-data-import.models';
import { Prisma } from '@prisma/client';
import { ConfirmedDeathsImportService } from './confirmed-deaths-import/confirmed-deaths-import.service';
import { ConfirmedDeathsCreateModel } from './confirmed-deaths-import/confirmed-deaths-import.models';
import { csvColumnNumberByColumnName } from './column-numbers';
import { HospitalizationsImportService } from './hospitalizations-import/hospitalizations-import.service';
import { HospitalizationsCreateModel } from './hospitalizations-import/hospitalizations-import.models';
import { VaccinationsImportService } from './vaccinations-import/vaccinations-import.service';
import { VaccinationsCreateModel } from './vaccinations-import/vaccinations-import.models';
import { CovidTestsCreateModel } from './covid-tests-import/covid-tests-import.models';
import { CovidTestsImportService } from './covid-tests-import/covid-tests-import.service';

const SAVE_BATCH_SIZE = 20;

@Injectable()
export class OwidDataImportService {
  private readonly logger = new Logger(OwidDataImportService.name)

  constructor(private readonly owidDataImportRepository: OwidDataImportRepository,
    private readonly confirmedCasesImportService: ConfirmedCasesImportService,
    private readonly confirmedDeathsImportService: ConfirmedDeathsImportService,
    private readonly hospitalizationsImportService: HospitalizationsImportService,
    private readonly vaccinationsImportService: VaccinationsImportService,
    private readonly covidTestsImportService: CovidTestsImportService
  ) { }

  async importOwidCsvData(csvUrl: string) {

    const countryIdByIso = await this.getCountryIdByIso()

    const confirmedCases: ConfirmedCasesCreateModel[] = []
    const confirmedDeaths: ConfirmedDeathsCreateModel[] = []
    const hospitalizations: HospitalizationsCreateModel[] = []
    const vaccinations: VaccinationsCreateModel[] = []
    const covidTests: CovidTestsCreateModel[] = []

    let parsedRows = 0;

    https.get(csvUrl, res => {
      res.pipe(csvParse.parse({ fromLine: 2 }))
        .on('data', async (row: string[]) => {
          //console.log(row)

          const countryId = this.getCountryIdFromIsoCode(row, countryIdByIso)
          if (countryId === undefined) {
            const { isoCode } = csvColumnNumberByColumnName
            this.logger.warn(`iso code ${row[isoCode]} on incoming csv not found on database. Skipping...`);
            return
          }

          const confirmedCasesRow = this.confirmedCasesImportService.convertOwidDataRow(row, countryId)
          confirmedCases.push(confirmedCasesRow)

          const confirmedDeathsRow = this.confirmedDeathsImportService.convertOwidDataRow(row, countryId)
          confirmedDeaths.push(confirmedDeathsRow)

          const hospitalizationsRow = this.hospitalizationsImportService.convertOwidDataRow(row, countryId)
          hospitalizations.push(hospitalizationsRow)

          const vaccinationsRow = this.vaccinationsImportService.convertOwidDataRow(row, countryId);
          vaccinations.push(vaccinationsRow)

          const covidTestsRow = this.covidTestsImportService.convertOwidDataRow(row, countryId);
          covidTests.push(covidTestsRow)

          parsedRows++;

          if (parsedRows >= SAVE_BATCH_SIZE) {
            await this.commitParsedRows(confirmedCases, confirmedDeaths, hospitalizations, vaccinations, covidTests)
            parsedRows = 0;
          }
        })
        .on('end', async () => {
          console.log('Response ended');
          if (parsedRows > 0) {
            await this.commitParsedRows(confirmedCases, confirmedDeaths, hospitalizations, vaccinations, covidTests)
          }
        })
    }).on('error', err => {
      console.log(`error ${err}`)
    })
  }

  private async commitParsedRows(
    confirmedCases: ConfirmedCasesCreateModel[],
    confirmedDeaths: ConfirmedDeathsCreateModel[],
    hospitalizations: HospitalizationsCreateModel[],
    vaccinations: VaccinationsCreateModel[],
    covidTests: CovidTestsCreateModel[]
  ) {
    const transaction: Prisma.PrismaPromise<Prisma.BatchPayload>[] = []

    if (confirmedCases.length) {
      transaction.push(
        this.confirmedCasesImportService.saveConfirmedCases(confirmedCases)
      )
    }
    if (confirmedDeaths.length) {
      transaction.push(
        this.confirmedDeathsImportService.saveConfirmedDeaths(confirmedDeaths)
      )
    }
    if (hospitalizations.length) {
      transaction.push(
        this.hospitalizationsImportService.saveHospitalizations(hospitalizations)
      )
    }
    if (vaccinations.length) {
      transaction.push(
        this.vaccinationsImportService.saveVaccinations(vaccinations)
      )
    }
    if (covidTests.length) {
      transaction.push(
        this.covidTestsImportService.saveCovidTests(covidTests)
      )
    }

    if (transaction.length) {
      const results = await this.owidDataImportRepository.executeTransaction(transaction)
      console.log(results)
    }
  }

  private getCountryIdFromIsoCode(csvRow: string[], countryIdByIso: CountryIdByIso) {
    const { isoCode } = csvColumnNumberByColumnName
    const incomingCsvCountryIso = csvRow[isoCode]
    const countryId = countryIdByIso[incomingCsvCountryIso]
    return countryId;
  }

  private async getCountryIdByIso() {
    const countries = await this.owidDataImportRepository.getCountriesIso()

    const countryIdByIso: CountryIdByIso = {}
    for (const country of countries) {
      countryIdByIso[country.isoCode] = country.id
    }

    return countryIdByIso
  }
}