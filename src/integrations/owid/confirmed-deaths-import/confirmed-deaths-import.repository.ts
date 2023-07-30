import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { ConfirmedDeathsCreateModel } from "./confirmed-deaths-import.models";

@Injectable()
export class ConfirmedDeathsImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  saveConfirmedDeaths(confirmedDeaths: ConfirmedDeathsCreateModel[]) {
    return this.prismaService.confirmedCovidDeaths.createMany({
      data: confirmedDeaths,
      skipDuplicates: true
    })
  }
}