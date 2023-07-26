import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { CountryCovidModule } from '@country-covid';
import { DatabaseModule } from '@data-layer';

@Module({
  imports: [
    DatabaseModule,
    RouterModule.register([{
      path: 'country',
      module: CountryCovidModule
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
