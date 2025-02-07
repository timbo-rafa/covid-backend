import { Test, TestingModule } from '@nestjs/testing';
import { setupTestDatabase } from 'test/e2e-database-setup';
import { DatabaseModule, PrismaService } from 'src/data-layer';
import { Prisma, PrismaClient } from '@prisma/client';
import { applyCustomSerializationToJsTypes } from 'src/custom-js-types-serialization';
import { DataQueryInput, DatasetConfig } from './table';
import { TableService } from './table.service';
import { TableRepository } from './table.repository';
import { DownsamplingMethod } from './table.dto';
import { DownsamplingTableRepository } from './downsampling-table.repository';

applyCustomSerializationToJsTypes();

describe('Table Service', () => {
  const { getPrismaTestService } = setupTestDatabase();
  beforeEach(() => (prismaService = getPrismaTestService()));
  let prismaService: PrismaClient;
  let tableService: TableService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TableService, TableRepository, DownsamplingTableRepository],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    tableService = moduleFixture.get<TableService>(TableService);
  });

  it('downsamples data in same month', async () => {
    const times = [new Date('2020-03-05'), new Date('2020-03-04'), new Date('2020-03-03')].sort(
      (d1, d2) => d2.getTime() - d1.getTime(),
    );
    const data: Prisma.CovidCreateManyInput[] = [
      { code: 'BRA', country: 'Brazil', date: times[0], total_cases: 1 },
      { code: 'BRA', country: 'Brazil', date: times[1], total_cases: 5 },
      { code: 'BRA', country: 'Brazil', date: times[2], total_cases: 10 },
      { code: 'CAN', country: 'Brazil', date: times[2], total_cases: 20 },
    ];

    await prismaService.covid.createMany({ data });

    const datasetConfig: DatasetConfig = { tableName: 'covid', timeColumnName: 'date' };
    const queryInput: DataQueryInput = {
      downsamplingMethod: DownsamplingMethod.LatestMonthly,
      selectColumnNames: ['total_cases', 'code', 'date'],
    };
    const rows = await tableService.getTableData(datasetConfig, queryInput);

    expect(rows).toEqual<typeof rows>({
      mostRecentTimestamp: times[0].getTime(),
      data: [
        { code: 'BRA', date: times[0].getTime(), total_cases: 1 },
        { code: 'CAN', date: times[2].getTime(), total_cases: 20 },
      ],
      timestamps: [times[0].getTime(), times[2].getTime()],
    });
  });
});
