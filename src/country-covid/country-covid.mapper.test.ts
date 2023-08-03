import { PrismaService } from '@data-layer';
import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { getCountryCovidTableDtoStub } from 'src/dtos/country.dto.stub';
import { CountryCovidMapper } from './country-covid.mapper';
import { CountryCovidModule } from './country-covid.module';
import { getCountryEntityStub } from './country-covid.repository.stub.test';

describe('CountryCovidMapper', () => {
  let countryCovidMapper: CountryCovidMapper;
  const prismaServiceMock = mockDeep<PrismaService>();

  beforeEach(jest.resetAllMocks);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CountryCovidModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    countryCovidMapper = moduleRef.get<CountryCovidMapper>(CountryCovidMapper);
  });

  it('should ignore countries with no data', () => {
    const firstCountryEntity = getCountryEntityStub({
      continentId: 5,
      id: 6,
      isoCode: 'BRA',
      name: 'A country',
    });

    const mappedDto = countryCovidMapper.mapEntitiesTo2dTableDto([firstCountryEntity]);

    expect(mappedDto).toEqual([]);
  });

  it('should map country covid data to flat 2d table data', () => {
    const firstCountryEntity = getCountryEntityStub({
      continentId: 5,
      id: 6,
      isoCode: 'BRA',
      name: 'A country',
      covidCases: [{ date: new Date(2), newCases: 1, totalCases: BigInt(11) }],
      covidDeaths: [{ date: new Date(3), newDeaths: 3, totalDeaths: BigInt(5) }],
      covidHospitalizations: [
        { date: new Date(2), hospPatients: 15, icuPatients: 17, weeklyHospAdmissions: 18, weeklyIcuAdmissions: 19 },
      ],
    });
    const secondCountryEntity = getCountryEntityStub({
      continentId: 5,
      id: 7,
      isoCode: 'ZOP',
      name: 'Another country',
      covidTests: [{ date: new Date(1), newTests: 20, positiveRate: 21, testsPerCase: 22, totalTests: BigInt(23) }],
      covidVaccinations: [
        {
          date: new Date(1),
          newVaccinations: 33,
          peopleFullyVaccinated: BigInt(34),
          peopleVaccinated: BigInt(35),
          totalBoosters: BigInt(36),
          totalVaccinations: BigInt(37),
        },
      ],
    });
    const mappedDto = countryCovidMapper.mapEntitiesTo2dTableDto([firstCountryEntity, secondCountryEntity]);

    expect(mappedDto[0]).toEqual<(typeof mappedDto)[number]>(
      getCountryCovidTableDtoStub({
        id: firstCountryEntity.id,
        date: firstCountryEntity.covidDeaths[0].date,
        name: firstCountryEntity.name,
        isoCode: firstCountryEntity.isoCode,
        newDeaths: firstCountryEntity.covidDeaths[0].newDeaths,
        totalDeaths: firstCountryEntity.covidDeaths[0].totalDeaths,
      }),
    );

    expect(mappedDto[1]).toEqual<(typeof mappedDto)[number]>(
      getCountryCovidTableDtoStub({
        id: firstCountryEntity.id,
        date: firstCountryEntity.covidCases[0].date,
        name: firstCountryEntity.name,
        isoCode: firstCountryEntity.isoCode,
        newCases: firstCountryEntity.covidCases[0].newCases,
        totalCases: firstCountryEntity.covidCases[0].totalCases,
        hospPatients: firstCountryEntity.covidHospitalizations[0].hospPatients,
        icuPatients: firstCountryEntity.covidHospitalizations[0].icuPatients,
        weeklyHospAdmissions: firstCountryEntity.covidHospitalizations[0].weeklyHospAdmissions,
        weeklyIcuAdmissions: firstCountryEntity.covidHospitalizations[0].weeklyIcuAdmissions,
      }),
    );
    expect(mappedDto[2]).toEqual<(typeof mappedDto)[number]>(
      getCountryCovidTableDtoStub({
        id: secondCountryEntity.id,
        date: secondCountryEntity.covidTests[0].date,
        name: secondCountryEntity.name,
        isoCode: secondCountryEntity.isoCode,
        newTests: secondCountryEntity.covidTests[0].newTests,
        positiveRate: secondCountryEntity.covidTests[0].positiveRate,
        testsPerCase: secondCountryEntity.covidTests[0].testsPerCase,
        totalTests: secondCountryEntity.covidTests[0].totalTests,
        newVaccinations: secondCountryEntity.covidVaccinations[0].newVaccinations,
        peopleFullyVaccinated: secondCountryEntity.covidVaccinations[0].peopleFullyVaccinated,
        peopleVaccinated: secondCountryEntity.covidVaccinations[0].peopleVaccinated,
        totalBoosters: secondCountryEntity.covidVaccinations[0].totalBoosters,
        totalVaccinations: secondCountryEntity.covidVaccinations[0].totalVaccinations,
      }),
    );
  });

  it('should not merge countries with same date', () => {
    const firstCountryEntity = getCountryEntityStub({
      continentId: 5,
      id: 6,
      isoCode: 'BRA',
      name: 'A country',
      covidCases: [{ date: new Date(2), newCases: 1, totalCases: BigInt(11) }],
    });
    const secondCountryEntity = getCountryEntityStub({
      continentId: 5,
      id: 7,
      isoCode: 'AZX',
      name: 'Another Country',
      covidDeaths: [{ date: new Date(2), newDeaths: 3, totalDeaths: BigInt(5) }],
    });

    const mappedDto = countryCovidMapper.mapEntitiesTo2dTableDto([firstCountryEntity, secondCountryEntity]);

    expect(mappedDto[0]).toEqual<(typeof mappedDto)[number]>(
      getCountryCovidTableDtoStub({
        id: firstCountryEntity.id,
        date: firstCountryEntity.covidCases[0].date,
        name: firstCountryEntity.name,
        isoCode: firstCountryEntity.isoCode,
        newCases: firstCountryEntity.covidCases[0].newCases,
        totalCases: firstCountryEntity.covidCases[0].totalCases,
      }),
    );
    expect(mappedDto[1]).toEqual<(typeof mappedDto)[number]>(
      getCountryCovidTableDtoStub({
        id: secondCountryEntity.id,
        date: secondCountryEntity.covidDeaths[0].date,
        name: secondCountryEntity.name,
        isoCode: secondCountryEntity.isoCode,
        newDeaths: secondCountryEntity.covidDeaths[0].newDeaths,
        totalDeaths: secondCountryEntity.covidDeaths[0].totalDeaths,
      }),
    );
  });
});
