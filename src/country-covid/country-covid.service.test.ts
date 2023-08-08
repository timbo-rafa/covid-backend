import { PrismaDateRangeComparator, PrismaService } from '@data-layer';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CountryCovidServiceArgs } from './country-covid.models';
import { CountryCovidModule } from './country-covid.module';
import { CountryCovidRepository } from './country-covid.repository';
import { getCountryEntityStub } from './country-covid.repository.stub.test';
import { CountryCovidService } from './country-covid.service';

describe('CountryCovidService', () => {
  let countryCovidService: CountryCovidService;
  const countryCovidRepositoryMock = mock<CountryCovidRepository>();

  beforeEach(jest.resetAllMocks);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CountryCovidModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(CountryCovidRepository)
      .useValue(countryCovidRepositoryMock)
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
    countryCovidRepositoryMock.findByCountryAndTime.mockResolvedValueOnce(expectedResult);
    const query: CountryCovidServiceArgs = {
      countryIds: [1, 2, 3],
      dateRange: { start: new Date(Date.UTC(1, 1, 1)), end: new Date(Date.UTC(1, 1, 3)) },
      selectCovidFields: new Set([
        'date',
        'newCases',
        'totalCases',
        'hospPatients',
        'icuPatients',
        'newDeaths',
        'newTests',
        'newVaccinations',
        'peopleFullyVaccinated',
        'peopleVaccinated',
        'positiveRate',
        'testsPerCase',
        'totalBoosters',
        'totalDeaths',
        'totalTests',
        'totalVaccinations',
        'weeklyHospAdmissions',
        'weeklyIcuAdmissions',
      ]),
    };
    const results = await countryCovidService.findByCountryAndTime(query);

    expect(results).toEqual(expectedResult);

    expect(countryCovidRepositoryMock.findByCountryAndTime).toHaveBeenCalledTimes(1);
    expect(countryCovidRepositoryMock.findByCountryAndTime).toHaveBeenCalledWith<
      Parameters<CountryCovidRepository['findByCountryAndTime']>
    >({
      countryIds: query.countryIds,
      covidDataArgs: {
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
        covidDeaths: {
          select: {
            date: true,
            newDeaths: true,
            totalDeaths: true,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
        covidHospitalizations: {
          select: {
            date: true,
            hospPatients: true,
            icuPatients: true,
            weeklyHospAdmissions: true,
            weeklyIcuAdmissions: true,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
        covidTests: {
          select: {
            date: true,
            newTests: true,
            positiveRate: true,
            testsPerCase: true,
            totalTests: true,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
        covidVaccinations: {
          select: {
            date: true,
            newVaccinations: true,
            peopleFullyVaccinated: true,
            peopleVaccinated: true,
            totalBoosters: true,
            totalVaccinations: true,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
      },
    });
  });

  test('should return newCases field only', async () => {
    const expectedResult = [
      {
        ...getCountryEntityStub({
          continentId: 4,
          id: 1,
          isoCode: 'CAN',
          name: 'Canada',
          covidCases: [{ date: new Date(Date.UTC(1, 1, 2)), newCases: 5 }],
        }),
      },
    ];
    countryCovidRepositoryMock.findByCountryAndTime.mockResolvedValueOnce(expectedResult);

    const query: CountryCovidServiceArgs = {
      countryIds: [1, 2, 3],
      dateRange: { start: new Date(Date.UTC(1, 1, 1)), end: new Date(Date.UTC(1, 1, 3)) },
      selectCovidFields: new Set(['newCases', 'date']),
    };
    const results = await countryCovidService.findByCountryAndTime(query);

    expect(results).toEqual(expectedResult);

    expect(countryCovidRepositoryMock.findByCountryAndTime).toHaveBeenCalledTimes(1);
    expect(countryCovidRepositoryMock.findByCountryAndTime).toHaveBeenCalledWith<
      Parameters<CountryCovidRepository['findByCountryAndTime']>
    >({
      countryIds: query.countryIds,
      covidDataArgs: {
        covidCases: {
          select: {
            date: true,
            newCases: true,
            totalCases: false,
          },
          where: {
            date: PrismaDateRangeComparator.dateInsideRange(query.dateRange),
          },
        },
        covidDeaths: undefined,
        covidHospitalizations: undefined,
        covidTests: undefined,
        covidVaccinations: undefined,
      },
    });
  });
});
