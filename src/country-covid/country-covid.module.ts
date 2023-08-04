import { Module } from '@nestjs/common';
import { DatabaseModule } from '@data-layer';
import { CountryCovidController } from './country-covid.controller';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidRepository } from './country-covid.repository';
import { CountryCovidResolver } from './country-covid.resolver';
import { CountryCovidMapper } from './country-covid.mapper';
import { CountryCovidTableMapper } from './country-covid-table.mapper';

@Module({
  imports: [DatabaseModule],
  controllers: [CountryCovidController],
  providers: [CountryCovidRepository, CountryCovidService, CountryCovidResolver, CountryCovidMapper, CountryCovidTableMapper],
  exports: [CountryCovidService],
})
export class CountryCovidModule {}
