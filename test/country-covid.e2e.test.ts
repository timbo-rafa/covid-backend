import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CountryCovidTableDto } from '@dtos';
import { setupTestDatabase } from './test-database/setup-test-database';
import { PrismaService } from '@data-layer';
import { getCountryCovidTableSerializedDtoStub } from 'src/dtos/country.dto.stub';
import { graphqlRequest } from './graphql-request.test';
import { DatesAsStrings } from '@utils';

const countryCovidDataGql = `query($input: CountryCovidDataInput!) {
  countryCovidTableData(countryCovidDataInput: $input) {
    id
    name
    isoCode
    date
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
  let prismaService: PrismaService;
  const { getTestDbService } = setupTestDatabase();

  beforeEach(async () => {
    prismaService = getTestDbService();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('should return covid table data as 2d array', async () => {
    const country = await prismaService.country.create({
      data: {
        id: 300,
        isoCode: 'UNK',
        continentId: 5,
        name: 'Canada',
        covidDeaths: {
          create: { date: new Date('2001-02-01'), newDeaths: 1, totalDeaths: 2 },
        },
        covidTests: {
          create: { date: new Date('2001-02-02'), newTests: 3, positiveRate: 4, testsPerCase: 5, totalTests: 6 },
        },
        covidHospitalizations: {
          create: {
            date: new Date('2001-02-03'),
            hospPatients: 7,
            icuPatients: 8,
            weeklyHospAdmissions: 9,
            weeklyIcuAdmissions: 10,
          },
        },
        covidVaccinations: {
          create: {
            date: new Date('2001-02-04'),
            newVaccinations: 11,
            peopleFullyVaccinated: 12,
            peopleVaccinated: 13,
            totalBoosters: 14,
            totalVaccinations: 15,
          },
        },
        covidCases: {
          create: {
            date: new Date('2001-02-05'),
            newCases: 16,
            totalCases: 17,
          },
        },
      },
      include: {
        covidCases: true,
        covidDeaths: true,
        covidHospitalizations: true,
        covidVaccinations: true,
        covidTests: true,
      },
    });
    const response = await graphqlRequest(app, countryCovidDataGql, { countryIds: country.id })
      .send({ query: countryCovidDataGql, variables: { input: { countryIds: country.id } } })
      .expect(200);

    const countryCovidTableDtos: DatesAsStrings<CountryCovidTableDto>[] = response.body.data.countryCovidTableData;

    const expectedDtos: typeof countryCovidTableDtos = [
      getCountryCovidTableSerializedDtoStub({
        ...country,
        ...country.covidCases[0],
      }),
      getCountryCovidTableSerializedDtoStub({
        ...country,
        ...country.covidVaccinations[0],
      }),
      getCountryCovidTableSerializedDtoStub({
        ...country,
        ...country.covidHospitalizations[0],
      }),
      getCountryCovidTableSerializedDtoStub({
        ...country,
        ...country.covidTests[0],
      }),
      getCountryCovidTableSerializedDtoStub({
        ...country,
        ...country.covidDeaths[0],
      }),
    ];

    expect(countryCovidTableDtos).toEqual<typeof countryCovidTableDtos>(expectedDtos);
  });

  it.skip('/api/countries/covid-data?countryIds=5&newCases=true', async () => {
    const response = await request(app.getHttpServer()).get('/api/countries/covid-data?countryIds=38&newCases=true').expect(200);

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
