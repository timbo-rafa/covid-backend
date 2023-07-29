import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { OwidConfirmedCasesCreateModel } from "./confirmed-cases-import.models";

@Injectable()
export class ConfirmedCasesImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  confirmedCases(confirmedCases: OwidConfirmedCasesCreateModel[]) {
    this.prismaService
  }
}