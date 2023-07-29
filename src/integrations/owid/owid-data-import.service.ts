import { Injectable } from '@nestjs/common';
import * as csvParse from 'csv-parse';
import * as https from 'https';
import { OwidDataImportRepository } from './owid-data-import.repository';

@Injectable()
export class OwidDataImportService {

  constructor(private readonly owidDataImportRepository: OwidDataImportRepository) { }

  async importOwidCsvData(csvUrl: string) {

    const countryIdByIso = await this.getCountryIdByIso()

    https.get(csvUrl, res => {
      console.log(`status code=${res.statusCode}`)
      res.pipe(csvParse.parse({}))
        .on('data', chunk => {
          console.log(typeof chunk)
          console.log(chunk)
        })
        .on('end', () => {
          console.log('Response ended')
        })
    }).on('error', err => {
      console.log(`error ${err}`)
    })
  }

  private async getCountryIdByIso() {
    const countries = await this.owidDataImportRepository.getCountriesIso()

    const countryIdByIso = {}
    for (const country of countries) {
      countryIdByIso[country.isoCode] = country.id
    }

    return countryIdByIso
  }
}