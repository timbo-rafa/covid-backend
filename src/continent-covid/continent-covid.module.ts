import { Module } from '@nestjs/common';
import { DatabaseModule } from '@data-layer';
import { ContinentCovidController } from './continent-covid.controller';
import { ContinentCovidService } from './continent-covid.service';
import { ContinentCovidRepository } from './continent-covid.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ContinentCovidController],
  providers: [ContinentCovidRepository, ContinentCovidService],
  exports: [ContinentCovidService],
})
export class ContinentCovidModule {}
