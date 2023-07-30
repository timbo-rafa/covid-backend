import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { HospitalizationsCreateModel } from "./hospitalizations-import.models";

@Injectable()
export class HospitalizationsImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  saveHospitalizations(hospitalizations: HospitalizationsCreateModel[]) {
    return this.prismaService.covidHospitalizations.createMany({
      data: hospitalizations,
      skipDuplicates: true
    })
  }
}