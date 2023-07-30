import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { ConfirmedCasesCreateModel } from "./confirmed-cases-import.models";

@Injectable()
export class ConfirmedCasesImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  saveConfirmedCases(confirmedCases: ConfirmedCasesCreateModel[]) {
    return this.prismaService.confirmedCovidCases.createMany({
      data: confirmedCases,
      skipDuplicates: true
    })
  }
}