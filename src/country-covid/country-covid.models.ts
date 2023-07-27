import { IsDate, IsOptional, Matches } from "class-validator"
import { Type } from 'class-transformer'


export class CountryCovidRequestQuery {
  @IsOptional()
  @Type(() => String)
  @Matches(/^(\d+)(,*\d+)*$/i, {
    message: (args) => `${args.value} is not a valid list of country ids`,
  })
  countryIds?: string;


  @IsOptional()
  @IsDate()
  start?: Date

  @IsOptional()
  @IsDate()
  end?: Date
}

export type CountryCovidFilter = { countryIds?: number[], dateRange?: { start?: Date, end?: Date } }