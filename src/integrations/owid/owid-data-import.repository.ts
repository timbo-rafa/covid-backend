import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class OwidDataImportRepository {
  constructor(private readonly prismaService: PrismaService) { }

  getCountriesIso() {
    return this.prismaService.country.findMany({
      select: { id: true, isoCode: true }
    })
  }

  executeTransaction<T>(prismaPromises: Prisma.PrismaPromise<T>[]) {
    return this.prismaService.$transaction(prismaPromises)
  }
}