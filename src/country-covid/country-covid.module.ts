import { Module } from '@nestjs/common';
import { DatabaseModule } from '@data-layer';
import { CountryCovidController } from './country-covid.controller';
import { CountryCovidService } from './country-covid.service';
import { CountryCovidRepository } from './country-covid.repository';

@Module({
  imports: [DatabaseModule],
  providers: [CountryCovidRepository, CountryCovidController, CountryCovidService],
  exports: [CountryCovidController, CountryCovidService]
})
export class CountryCovidModule { }
