import { Type } from 'class-transformer';
import { IsOptional, Matches, IsDate } from 'class-validator';

export class ContinentCovidRequestQuery {
  @IsOptional()
  @Type(() => String)
  @Matches(/^(\d+)(,*\d+)*$/i, {
    message: (args) => `${args.value} is not a valid list of continent ids`,
  })
  continentIds?: string;

  @IsOptional()
  @IsDate()
  start?: Date;

  @IsOptional()
  @IsDate()
  end?: Date;
}

export type ContinentCovidFilter = {
  continentIds?: number[];
  dateRange?: { start?: Date; end?: Date };
};
