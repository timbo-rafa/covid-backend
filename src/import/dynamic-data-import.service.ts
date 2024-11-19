import { Injectable, Logger } from '@nestjs/common';
import * as csvParse from 'csv-parse';
//import * as https from 'https';
import * as http from 'http';
import { DynamicDataImportRepository } from './dynamic-data-import.repository';
import { Prisma } from '@prisma/client';
import { DatabaseMetadataRepository } from 'src/data-layer/database-module/database-metadata.repository';

@Injectable()
export class DynamicDataImportService<DataType = unknown> {
  private readonly logger = new Logger(DynamicDataImportService.name);
  private readonly SAVE_BATCH_SIZE = 500;

  constructor(private readonly dynamicDataImportRepository: DynamicDataImportRepository,
    private readonly DatabaseMetadataRepository: DatabaseMetadataRepository

  ) {}

  async importDynamicCsvData(csvUrl: string) {
    let rows: DataType[] = [];

    let parsedRows = 0;
    let createdCount = 0;

    const tableNames = this.DatabaseMetadataRepository.getColumnNames('dynamic_data', 'country_covid');

    return new Promise((resolve, reject) => {
      http
        .get(csvUrl, (res) => {
          const csvStream = res.pipe(csvParse.parse({ cast: true, castDate: true }));
          csvStream
            .on('data', async (row) => {
              rows.push(row);

              parsedRows++;

              if (parsedRows >= this.SAVE_BATCH_SIZE) {
                csvStream.pause();
                createdCount += await this.commitBatch(rows, 'dynamic_data.country_covid');

                rows = [];
                parsedRows = 0;
              }
              csvStream.resume();
            })
            .on('end', async () => {
              if (parsedRows > 0) {
                createdCount += await this.commitBatch(rows);
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

  private async commitBatch(rows: DataType[], tableName: string) {
    const transaction: Prisma.PrismaPromise<number>[] = [];

    if (rows.length) {
      const batch = this.dynamicDataImportRepository.saveImportedCountryCovidData(rows, tableName);
      transaction.push(batch);
    }

    if (transaction.length) {
      console.log(JSON.stringify({ length: rows.length, first: rows[0] }));
      return 0;
      // const batchCount = await this.owidDataImportRepository.executeTransaction(transaction);
      // console.log(batchCount);
      // return batchCount.map((batch) => batch.count).reduce((prev, cur) => prev + cur, 0);
    }

    return 0;
  }
}
