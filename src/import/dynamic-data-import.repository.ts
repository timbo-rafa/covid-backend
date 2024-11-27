import { PrismaService } from '@data-layer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DynamicDataImportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  executeTransaction<T>(prismaPromises: Prisma.PrismaPromise<T>[]) {
    return this.prismaService.$transaction(prismaPromises);
  }

  saveImportedCountryCovidData(data: Prisma.CovidCreateManyInput[]) {
    return this.prismaService.covid.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
