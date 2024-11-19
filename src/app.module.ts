import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DynamicDataImportModule } from 'src/import';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    DynamicDataImportModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'import',
            module: DynamicDataImportModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
