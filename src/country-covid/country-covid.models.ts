import { IsDate, IsOptional, Matches } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CountryDbQueryArgs } from './country-covid.queries';

export class CountryCovidRequestQuery {
  @IsOptional()
  @Type(() => String)
  @Matches(/^(\d+)(,*\d+)*$/i, {
    message: (args) => `${args.value} is not a valid list of country ids`,
  })
  countryIds?: string;

  @IsOptional()
  @IsDate()
  start?: Date;

  @IsOptional()
  @IsDate()
  end?: Date;
  
  @IsOptional()
  @Type(() => Boolean)
  newCases?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  totalCases?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  newDeaths?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  totalDeaths?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  hospPatients?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  icuPatients?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  weeklyHospAdmissions?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  weeklyIcuAdmissions?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  newTests?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  positiveRate?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  testsPerCase?: boolean;
  
  @IsOptional()
  @Type(() => Boolean)
  totalTests?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  newVaccinations?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  peopleFullyVaccinated?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  peopleVaccinated?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  totalBoosters?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  totalVaccinations?: boolean;
}

export type CountryCovidArgs = {
  countryIds?: number[];
  covidDataArgs: CountryDbQueryArgs;
  covidDataDefaults?: CountryDbQueryArgs;
  //dateRange?: { start?: Date; end?: Date };
};
