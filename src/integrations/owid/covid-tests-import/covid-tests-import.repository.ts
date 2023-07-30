import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { CovidTestsCreateModel } from "./covid-tests-import.models";

@Injectable()
export class CovidTestsImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  saveCovidTests(covidTests: CovidTestsCreateModel[]) {
    return this.prismaService.covidTests.createMany({
      data: covidTests,
      skipDuplicates: true
    })
  }
}