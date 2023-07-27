import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { CountryCovidModule } from '@country-covid';
import { ContinentCovidModule } from '@continent-covid';
import { DatabaseModule } from '@data-layer';

@Module({
  imports: [
    DatabaseModule,
    CountryCovidModule,
    ContinentCovidModule,
    RouterModule.register([{
      path: 'api',
      children: [{
        path: 'country',
        module: CountryCovidModule
      },
      {
        path: 'continent',
        module: ContinentCovidModule
      }],
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
