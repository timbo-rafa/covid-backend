import { Injectable, Logger } from '@nestjs/common';
import * as csvParse from 'csv-parse';
//import * as https from 'https';
import * as http from 'http';
import { DynamicDataImportRepository } from './dynamic-data-import.repository';
import { Prisma } from '@prisma/client';
import { castCsvColumn } from './cast-csv-column';
import { parseUrl } from 'src/utils/url';

@Injectable()
export class DynamicDataImportService {
  private readonly logger = new Logger(DynamicDataImportService.name);
  private readonly SAVE_BATCH_SIZE = 500;

  constructor(private readonly dynamicDataImportRepository: DynamicDataImportRepository) {}

  async importDynamicCsvData(csvUrl: string) {
    let rows: Prisma.CovidCreateManyInput[] = [];

    let parsedRows = 0;
    let createdCount = 0;

    const url = parseUrl(csvUrl);

    if (!url) {
      return Promise.reject(new Error('Invalid encoded URL'));
    }

    return new Promise((resolve, reject) => {
      http
        .get(url, (res) => {
          const csvStream = res.pipe(
            csvParse.parse({ cast: castCsvColumn, columns: true, skip_empty_lines: true, skip_records_with_empty_values: true }),
          );
          csvStream
            .on('data', async (row) => {
              rows.push(row);

              parsedRows++;

              if (parsedRows >= this.SAVE_BATCH_SIZE) {
                csvStream.pause();
                createdCount += await this.commitCountryCovidBatch(rows);

                rows = [];
                parsedRows = 0;
              }
              csvStream.resume();
            })
            .on('end', async () => {
              if (parsedRows > 0) {
                createdCount += await this.commitCountryCovidBatch(rows);
                rows = [];
              }

              console.log(`Saved ${createdCount} rows`);
              resolve(createdCount);
            });
        })
        .on('error', (err) => {
          console.log(`error ${err}`);
          reject(err);
        });
    });
  }

  private async commitCountryCovidBatch(rows: Prisma.CovidCreateManyInput[]) {
    const transaction: Prisma.PrismaPromise<Prisma.BatchPayload>[] = [];

    if (rows.length) {
      const batch = this.dynamicDataImportRepository.saveImportedCountryCovidData(rows);
      transaction.push(batch);
    }

    if (transaction.length) {
      // try {
      const batchCount = await this.dynamicDataImportRepository.executeTransaction(transaction);
      const { code, country, continent, date } = rows[0];
      console.log(JSON.stringify({ code, country, continent, date, batchCount }));
      return batchCount.map((batch) => batch.count).reduce((prev, cur) => prev + cur, 0);
      // } catch (error) {
      //   if (error instanceof PrismaClientKnownRequestError) {
      //     console.warn('Error saving data. Skipping this batch...', JSON.stringify(error));
      //   } else {
      //     throw error;
      //   }
      // }
    }

    return 0;
  }
}
