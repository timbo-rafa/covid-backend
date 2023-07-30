import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { VaccinationsCreateModel } from './vaccinations-import.models';

@Injectable()
export class VaccinationsImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  saveVaccinations(vaccinations: VaccinationsCreateModel[]) {
    return this.prismaService.covidVaccinations.createMany({
      data: vaccinations,
      skipDuplicates: true,
    });
  }
}
