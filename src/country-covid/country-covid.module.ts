import { Module } from '@nestjs/common';
import { DatabaseModule } from '@data-layer';
import { CountryCovidController } from './country-covid.controller';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidRepository } from './country-covid.repository';
import { CountryCovidResolver } from './country-covid.resolver';
import { CountryCovidMapper } from './country-covid.mapper';

@Module({
  imports: [DatabaseModule],
  controllers: [CountryCovidController],
  providers: [CountryCovidRepository, CountryCovidService, CountryCovidResolver, CountryCovidMapper],
  exports: [CountryCovidService],
})
export class CountryCovidModule {}
