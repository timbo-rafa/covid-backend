import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TableModule } from './table.module';
import { setupTestDatabase } from 'test/e2e-database-setup';
import { PrismaService } from 'src/data-layer';
import { PrismaClient } from '@prisma/client';

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

  it('/tables/covid?dictionaryColumnNames=code,date&selectColumnNames=total_cases', () => {
    return request.default(app.getHttpServer())
      .get('/tables/covid?dictionaryColumnNames=code,date&selectColumnNames=total_cases')
      .expect(200)
      .expect([{ database: 'up' }]);
  });
});
