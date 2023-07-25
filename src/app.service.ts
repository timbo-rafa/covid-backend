import { Injectable } from '@nestjs/common';
import { PrismaService } from '@data-layer';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  pingDatabase() {
    return this.prismaService.$queryRaw<[{database: 'up'}]>`SELECT 'up' AS "database"`;
  }
}
