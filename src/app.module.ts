import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DynamicDataImportModule } from 'src/import';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    DatabaseModule,
    DynamicDataImportModule,
    TableModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [TableModule, DynamicDataImportModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
