import { DatabaseModule } from '@data-layer';
import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableRepository } from './table.repository';
import { TableController } from './table.controller';

@Module({
  controllers: [TableController],
  imports: [DatabaseModule],
  providers: [TableService, TableRepository],
})
export class TableModule {}
