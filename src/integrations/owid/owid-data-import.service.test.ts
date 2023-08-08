import { PrismaService } from '@data-layer';
import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { ConfirmedCasesImportRepository } from './confirmed-cases-import/confirmed-cases-import.repository';
import { ConfirmedDeathsImportRepository } from './confirmed-deaths-import/confirmed-deaths-import.repository';
import { CovidTestsImportRepository } from './covid-tests-import/covid-tests-import.repository';
import { HospitalizationsImportRepository } from './hospitalizations-import/hospitalizations-import.repository';
import { OwidDataImportModule } from './owid-data-import.module';
import { OwidDataImportService } from './owid-data-import.service';
import { VaccinationsImportRepository } from './vaccinations-import/vaccinations-import.repository';
import { OwidDataImportRepository } from './owid-data-import.repository';
import { countriesStub, csvString } from './owid-data-import.repository.stub.test';
import * as https from 'https';
//import * as nodeHttpMocks from 'node-mocks-http'
import { ClientRequest, IncomingMessage } from 'http';
import { Readable } from 'stream';
import EventEmitter from 'events';

jest.mock('https');
const httpsMock = https as jest.Mocked<typeof https>;

describe('OwidDataImportService', () => {
  let owidDataImportService: OwidDataImportService;
  const owidDataImportRepositoryMock = mockDeep<OwidDataImportRepository>();
  const covidTestImportRepositoryMock = mockDeep<CovidTestsImportRepository>();
  const confirmedCasesImportRepository = mockDeep<ConfirmedCasesImportRepository>();
  const confirmedDeathsImportRepository = mockDeep<ConfirmedDeathsImportRepository>();
  const cospitalizationsImportRepository = mockDeep<HospitalizationsImportRepository>();
  const vaccinationsImportRepository = mockDeep<VaccinationsImportRepository>();

  beforeEach(jest.resetAllMocks);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OwidDataImportModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(OwidDataImportRepository)
      .useValue(owidDataImportRepositoryMock)
      .overrideProvider(CovidTestsImportRepository)
      .useValue(covidTestImportRepositoryMock)
      .overrideProvider(ConfirmedCasesImportRepository)
      .useValue(confirmedCasesImportRepository)
      .overrideProvider(ConfirmedDeathsImportRepository)
      .useValue(confirmedDeathsImportRepository)
      .overrideProvider(HospitalizationsImportRepository)
      .useValue(cospitalizationsImportRepository)
      .overrideProvider(VaccinationsImportRepository)
      .useValue(vaccinationsImportRepository)
      .compile();

    owidDataImportService = moduleRef.get<OwidDataImportService>(OwidDataImportService);
  });

  beforeEach(() => {
    owidDataImportRepositoryMock.getCountriesIso.mockResolvedValueOnce(countriesStub);
  });

  test('should import empty csv', async () => {

    // @ts-ignore
    httpsMock.get.mockImplementationOnce((csUrl, callback: (res: any) => void ) => {
      const res = Readable.from([])
      callback(res);
      

      return res;
    });
    const csvUrl = 'csv url';
    const createdCount = await owidDataImportService.importOwidCsvData(csvUrl);

    expect(httpsMock.get).toHaveBeenCalledWith(csvUrl, expect.any(Function));
    expect(createdCount).toEqual(0);
  });

  //TODO: test repositories were called
});
