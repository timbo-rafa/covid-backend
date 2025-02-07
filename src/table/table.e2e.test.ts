import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TableModule } from './table.module';
import { setupTestDatabase } from 'test/e2e-database-setup';
import { PrismaService } from 'src/data-layer';
import { Prisma, PrismaClient } from '@prisma/client';
import { applyCustomSerializationToJsTypes } from 'src/custom-js-types-serialization';
import { DataDictionaryDTO } from './table';

applyCustomSerializationToJsTypes();

describe('TableController (e2e)', () => {
  let prismaService: PrismaClient;
  const { getPrismaTestService } = setupTestDatabase();
  beforeEach(() => (prismaService = getPrismaTestService()));

  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TableModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('gets table data in dictionary form with column selection', async () => {
    const times = [new Date('2020-03-03'), new Date('2021-03-04'), new Date('2022-04-01')].sort(
      (d1, d2) => d2.getTime() - d1.getTime(),
    );
    const data: Prisma.CovidCreateManyInput[] = [
      { code: 'BRA', country: 'Brazil', date: times[0], total_cases: 1 },
      { code: 'BRA', country: 'Brazil', date: times[1], total_cases: 5 },
      { code: 'BRA', country: 'Brazil', date: times[2], total_cases: 10 },
      { code: 'CAN', country: 'Canada', date: times[1], total_cases: 3 },
    ];

    await prismaService.covid.createMany({ data });

    const { body, status } = await request
      .default(app.getHttpServer())
      .get(
        '/tables/covid?timeColumnName=date&dictionaryColumnNames=code,date&selectColumnNames=total_cases&downsamplingMethod=latest_monthly',
      );

    expect(body).toEqual<DataDictionaryDTO>({
      mostRecentTimestamp: times[0].getTime(),
      dataDictionary: {
        BRA: {
          [times[0].getTime()]: [{ code: 'BRA', date: times[0].getTime(), total_cases: 1 }],
          [times[1].getTime()]: [{ code: 'BRA', date: times[1].getTime(), total_cases: 5 }],
          [times[2].getTime()]: [{ code: 'BRA', date: times[2].getTime(), total_cases: 10 }],
        },
        CAN: {
          [times[1].getTime()]: [{ code: 'CAN', date: times[1].getTime(), total_cases: 3 }],
        },
      },
      timestamps: times.map((date) => date.getTime()),
    });
    expect(status).toEqual(HttpStatus.OK);
  });

  it('gets all the values of a column', async () => {
    const time = new Date('2020-03-03');
    const data: Prisma.CovidCreateManyInput[] = [
      { code: 'BRA', country: 'Brazil', date: time, total_cases: 1 },
      { code: 'BRA', country: 'Brazil', date: time, total_cases: 5 },
      { code: 'CHN', country: 'China', date: time, total_cases: 10 },
      { code: 'CAN', country: 'Canada', date: time, total_cases: 3 },
    ];

    await prismaService.covid.createMany({ data });

    const { body, status } = await request
      .default(app.getHttpServer())
      .get(
        '/tables/covid/columns/code',
      );

    expect(new Set(body)).toEqual(new Set(data.map(row => row.code)));
    expect(status).toEqual(HttpStatus.OK);
  });
});
