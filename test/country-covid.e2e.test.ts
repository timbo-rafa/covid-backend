import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CountryCovidTableDto } from '@dtos';

const countryCovidDataGql = `query {
  countryCovidTableData(countryCovidDataInput: {}) {
    id
    name
    isoCode
    newCases
    totalCases
    newDeaths
    totalDeaths
    hospPatients
    icuPatients
    weeklyHospAdmissions
    weeklyIcuAdmissions
    newTests
    positiveRate
    testsPerCase
    totalTests
    newVaccinations
    peopleFullyVaccinated
    peopleVaccinated
    totalBoosters
    totalVaccinations
  }
}
`;

describe('Country Covid Data (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({transform: true}))
    await app.init();
  });

  it('should return covid table data as 2d array', async () => {
    const response = await request(app.getHttpServer()).post('/graphql').send({ query: countryCovidDataGql }).expect(200);

    const countryCovidTableDtos :CountryCovidTableDto[] = response.body.data

    expect(countryCovidTableDtos).toEqual([])
  })

  it.skip('/api/countries/covid-data?countryIds=5&newCases=true', async () => {
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
