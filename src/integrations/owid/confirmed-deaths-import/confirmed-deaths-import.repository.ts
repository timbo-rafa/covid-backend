import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { OwidConfirmedDeathsCreateModel } from "./confirmed-deaths-import.models";

@Injectable()
export class ConfirmedDeathsImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  saveConfirmedDeaths(confirmedDeaths: OwidConfirmedDeathsCreateModel[]) {
    return this.prismaService.confirmedCovidDeaths.createMany({
      data: confirmedDeaths,
      skipDuplicates: true
    })
  }
}