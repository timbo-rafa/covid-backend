import { PrismaService } from "@data-layer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OwidDataImportRepository {
  constructor(private readonly prismaService: PrismaService) { }

  getCountriesIso() {
    return this.prismaService.country.findMany({
      select: { id: true, isoCode: true }
    })
  }
}