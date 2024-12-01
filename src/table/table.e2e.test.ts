import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TableModule } from './table.module';
import { setupTestDatabase } from 'test/e2e-database-setup';
import { PrismaService } from 'src/data-layer';
import { Prisma, PrismaClient } from '@prisma/client';
import { applyCustomSerializationToJsTypes } from 'src/custom-js-types-serialization';

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
    await app.init();
  });

  it('/tables/covid?dictionaryColumnNames=code,date&selectColumnNames=total_cases', async () => {
    const times = [new Date('2020-03-03'), new Date('2020-03-04')];
    const data: Prisma.CovidCreateManyInput[] = [
      { code: 'BRA', country: 'Brazil', date: times[0], total_cases: 5 },
      { code: 'BRA', country: 'Brazil', date: times[1], total_cases: 1 },
      { code: 'CAN', country: 'Canada', date: times[0], total_cases: 3 },
    ];

    await prismaService.covid.createManyAndReturn({
      data,
    });

    const response = await request
      .default(app.getHttpServer())
      .get('/tables/covid?dictionaryColumnNames=code,date&selectColumnNames=total_cases')
      .expect(200)

    expect(response.body).toEqual(
      {
        BRA: {
          [times[0].getTime()]: [data[0]],
          [times[1].getTime()]: [data[1]],
        },
        CAN: {
          [times[0].getTime()]: [data[2]],
        },
      },
    )
  });
});
