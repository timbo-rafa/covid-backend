import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { CountryCovidModule } from '@country-covid';
import { ContinentCovidModule } from '@continent-covid';
import { DatabaseModule } from '@data-layer';
import { OwidDataImportModule } from '@owid-data-import';

@Module({
  imports: [
    DatabaseModule,
    CountryCovidModule,
    ContinentCovidModule,
    OwidDataImportModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'countries',
            module: CountryCovidModule,
          },
          {
            path: 'continents',
            module: ContinentCovidModule,
          },
          {
            path: 'owid',
            module: OwidDataImportModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
