import { Injectable } from '@nestjs/common';
import * as csvParse from 'csv-parse';
import * as https from 'https';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { ConfirmedCasesImportService } from './confirmed-cases-import/confirmed-cases-import.service';
import { OwidConfirmedCasesCreateModel } from './confirmed-cases-import/confirmed-cases-import.models';
import { CountryIdByIso } from './owid-data-import.models';
import { Prisma } from '@prisma/client';

const SAVE_BATCH_SIZE = 50;

@Injectable()
export class OwidDataImportService {

  constructor(private readonly owidDataImportRepository: OwidDataImportRepository, private readonly confirmedCasesImportService: ConfirmedCasesImportService) { }

  async importOwidCsvData(csvUrl: string) {

    const countryIdByIso = await this.getCountryIdByIso()

    const confirmedCases: OwidConfirmedCasesCreateModel[] = []
    const confirmedCasesPromises = []

    let parsedRows = 0;

    https.get(csvUrl, res => {
      res.pipe(csvParse.parse({ fromLine: 2 }))
        .on('data', async row => {
          //console.log(row)

          const confirmedCasesRow = this.confirmedCasesImportService.convertOwidDataRow(row, countryIdByIso)
          if (confirmedCasesRow) {
            confirmedCases.push(confirmedCasesRow)
          }

          parsedRows++;

          if (parsedRows >= SAVE_BATCH_SIZE) {
            await this.commitParsedRows(confirmedCases)
            parsedRows = 0;
          }
        })
        .on('end', async () => {
          console.log('Response ended');
          if (parsedRows > 0) {
            await this.commitParsedRows(confirmedCases)
          }
        })
    }).on('error', err => {
      console.log(`error ${err}`)
    })
  }

  private async commitParsedRows(confirmedCases: OwidConfirmedCasesCreateModel[]) {
    const transaction: Prisma.PrismaPromise<Prisma.BatchPayload>[] = []

    if (confirmedCases.length) {
      transaction.push(
        this.confirmedCasesImportService.saveConfirmedCases(confirmedCases)
      )
    }
    // other data

    if (transaction.length) {
      const results = await this.owidDataImportRepository.executeTransaction(transaction)
      console.log(results)
    }
  }

  private async getCountryIdByIso() {
    const countries = await this.owidDataImportRepository.getCountriesIso()

    const countryIdByIso: CountryIdByIso = {}
    for (const country of countries) {
      countryIdByIso[country.isoCode] = country.id
    }
    console.log(JSON.stringify(countryIdByIso))
    console.log(JSON.stringify(countries))
    console.log(countries.length)

    return countryIdByIso
  }
}