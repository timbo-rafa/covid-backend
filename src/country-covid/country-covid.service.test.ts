import { PrismaDateRangeComparator, PrismaService } from '@data-layer';
import { mockDeep } from 'jest-mock-extended';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CountryCovidRequestQuery } from './country-covid.models';
import { CountryCovidModule } from './country-covid.module';
import { CountryCovidService } from './country-covid.service';

describe('CountryCovidService', () => {
  let countryCovidService: CountryCovidService;
  const prismaServiceMock = mockDeep<PrismaService>();


  beforeEach(jest.resetAllMocks)

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CountryCovidModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    countryCovidService =
      moduleRef.get<CountryCovidService>(CountryCovidService);
  });

  test('should filter country covid query', async () => {
    const expectedResult = [
      {
        continentId: 4,
        id: 1,
        isoCode: 'CAN',
        name: 'Canada',
        covidCases: [{ date: new Date(Date.UTC(1, 1, 2)), newCases: 5 }],
      },
    ];
    prismaServiceMock.country.findMany.mockResolvedValueOnce(expectedResult);
    const query: CountryCovidRequestQuery = {
      countryIds: '1,2,3',
      start: new Date(Date.UTC(1, 1, 1)),
      end: new Date(Date.UTC(1, 1, 3)),
      hospPatients: true,
      icuPatients: true,
      newCases: true,
      newDeaths: true,
      newTests: true,
      newVaccinations: true,
      peopleFullyVaccinated: true,
      peopleVaccinated: true,
      positiveRate: true,
      testsPerCase: true,
      totalBoosters: true,
      totalCases: true,
      totalDeaths: true,
      totalTests: true,
      totalVaccinations: true,
      weeklyHospAdmissions: true,
      weeklyIcuAdmissions: true,
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
            date: PrismaDateRangeComparator.dateInsideRange(query),
          },
        },
      },
      where: { id: { in: [1, 2, 3] } },
    };
    expect(prismaServiceMock.country.findMany).toHaveBeenCalledWith(
      expectedArg,
    );
  });

  test('should return new covid cases only', async () => {
    const expectedResult = [
      {
        continentId: 4,
        id: 1,
        isoCode: 'CAN',
        name: 'Canada',
        covidCases: [{ date: new Date(Date.UTC(1, 1, 2)), newCases: 5 }],
      },
    ];
    prismaServiceMock.country.findMany.mockResolvedValueOnce(expectedResult);

    const query: CountryCovidRequestQuery = {
      countryIds: '1,2,3',
      start: new Date(Date.UTC(1, 1, 1)),
      end: new Date(Date.UTC(1, 1, 3)),
      newCases: true,
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
            totalCases: undefined,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query),
          },
        },
      },
      where: { id: { in: [1, 2, 3] } },
    };
    expect(prismaServiceMock.country.findMany).toHaveBeenCalledWith(
      expectedArg,
    );
  });
});
