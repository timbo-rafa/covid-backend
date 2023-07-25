import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database-module/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [],
  exports: [DatabaseModule]
})
export class CovidDataModule {}
