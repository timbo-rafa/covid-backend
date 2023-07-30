import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({transform: true}))
    await app.init();
  });

  it('/api/countries/covid-data?countryIds=5&newCases=true', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/countries/covid-data?countryIds=38&newCases=true')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 38,
        isoCode: 'CAN',
        name: 'Canada',
        continentId: 4,
        covidCases: [{ date: '2023-07-26T00:00:00.000Z', newCases: 1239 }],
      },
    ]);
  });
});
