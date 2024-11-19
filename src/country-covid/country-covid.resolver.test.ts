import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidServiceArgs } from './country-covid.models';

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

describe('CountryCovidResolver', () => {
  let app: INestApplication;
  const countryCovidServiceMock = mock<CountryCovidService>();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CountryCovidService)
      .useValue(countryCovidServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('countryCovidTableData', async () => {
    countryCovidServiceMock.findCountryCovidTableDataByCountryAndTime.mockResolvedValueOnce([]);
    await request(app.getHttpServer()).post('/graphql').send({ query: countryCovidDataGql }).expect(200);

    expect(countryCovidServiceMock.findCountryCovidTableDataByCountryAndTime).toHaveBeenCalledTimes(1);
    const expectedArgs: CountryCovidServiceArgs = {
      countryIds: undefined,
      dateRange: { start: undefined, end: undefined },
      selectCovidFields: new Set([
        'newCases',
        'totalCases',
        'newDeaths',
        'totalDeaths',
        'hospPatients',
        'icuPatients',
        'weeklyHospAdmissions',
        'weeklyIcuAdmissions',
        'newTests',
        'positiveRate',
        'testsPerCase',
        'totalTests',
        'newVaccinations',
        'peopleFullyVaccinated',
        'peopleVaccinated',
        'totalBoosters',
        'totalVaccinations',
      ]),
    };
    expect(countryCovidServiceMock.findCountryCovidTableDataByCountryAndTime).toHaveBeenCalledWith<[CountryCovidServiceArgs]>(
      expectedArgs,
    );
  });
});
