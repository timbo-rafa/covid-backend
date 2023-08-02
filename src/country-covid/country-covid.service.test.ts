import { PrismaDateRangeComparator, PrismaService } from '@data-layer';
import { mockDeep } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CountryCovidModule } from './country-covid.module';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidServiceArgs } from './country-covid.models';
import { getCountryEntityStub } from './country-covid.repository.stub.test';

describe('CountryCovidService', () => {
  let countryCovidService: CountryCovidService;
  const prismaServiceMock = mockDeep<PrismaService>();

  beforeEach(jest.resetAllMocks);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CountryCovidModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    countryCovidService = moduleRef.get<CountryCovidService>(CountryCovidService);
  });

  test('should return all fields on country covid query', async () => {
    const expectedResult = [
      getCountryEntityStub({
        continentId: 4,
        id: 1,
        isoCode: 'CAN',
        name: 'Canada',
        covidCases: [{ date: new Date(Date.UTC(1, 1, 2)), newCases: 5 }],
      }),
    ];
    prismaServiceMock.country.findMany.mockResolvedValueOnce(expectedResult);
    const query: CountryCovidServiceArgs = {
      countryIds: [1, 2, 3],
      dateRange: { start: new Date(Date.UTC(1, 1, 1)), end: new Date(Date.UTC(1, 1, 3)) },
      selectCovidFields: new Set([
        'date',
        'newCases',
        'totalCases',
        // 'hospPatients',
        // 'icuPatients',
        // 'newDeaths',
        // 'newTests',
        // 'newVaccinations',
        // 'peopleFullyVaccinated',
        // 'peopleVaccinated',
        // 'positiveRate',
        // 'testsPerCase',
        // 'totalBoosters',
        // 'totalDeaths',
        // 'totalTests',
        // 'totalVaccinations',
        // 'weeklyHospAdmissions',
        // 'weeklyIcuAdmissions',
      ]),
    };
    const results = await countryCovidService.findByCountryAndTime(query);

    expect(results).toEqual(expectedResult);

    expect(prismaServiceMock.country.findMany).toHaveBeenCalledTimes(1);
    const expectedArg: Prisma.CountryFindManyArgs = {
      include: {
        covidCases: {
          select: {
            date: true,
            newCases: true,
            totalCases: true,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
      },
      where: { id: { in: [1, 2, 3] } },
    };
    expect(prismaServiceMock.country.findMany).toHaveBeenCalledWith(expectedArg);
  });

  test('should return newCases field only', async () => {
    const expectedResult = [
      getCountryEntityStub({
        continentId: 4,
        id: 1,
        isoCode: 'CAN',
        name: 'Canada',
        covidCases: [{ date: new Date(Date.UTC(1, 1, 2)), newCases: 5 }],
      }),
    ];
    prismaServiceMock.country.findMany.mockResolvedValueOnce(expectedResult);

    const query: CountryCovidServiceArgs = {
      countryIds: [1, 2, 3],
      dateRange: { start: new Date(Date.UTC(1, 1, 1)), end: new Date(Date.UTC(1, 1, 3)) },
      selectCovidFields: new Set(['newCases']),
    };
    const results = await countryCovidService.findByCountryAndTime(query);

    expect(results).toEqual(expectedResult);

    expect(prismaServiceMock.country.findMany).toHaveBeenCalledTimes(1);
    const expectedArg: Prisma.CountryFindManyArgs = {
      include: {
        covidCases: {
          select: {
            date: false,
            newCases: true,
            totalCases: false,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
      },
      where: { id: { in: [1, 2, 3] } },
    };
    expect(prismaServiceMock.country.findMany).toHaveBeenCalledWith(expectedArg);
  });
});
