import { ContinentCovidModule } from '@continent-covid';
import { CountryCovidModule } from '@country-covid';
import { DatabaseModule } from '@data-layer';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { OwidDataImportModule } from '@owid-data-import';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,   
    }),
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
  providers: [AppService],
})
export class AppModule {}
