import { IsDate, IsOptional, Matches } from 'class-validator';
import { Type } from 'class-transformer';
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
  date?: boolean;
  
  @IsOptional()
  newCases?: boolean;
  
  @IsOptional()
  totalCases?: boolean;
  
  @IsOptional()
  newDeaths?: boolean;
  
  @IsOptional()
  totalDeaths?: boolean;
  
  @IsOptional()
  hospPatients?: boolean;
  
  @IsOptional()
  icuPatients?: boolean;
  
  @IsOptional()
  weeklyHospAdmissions?: boolean;
  
  @IsOptional()
  weeklyIcuAdmissions?: boolean;
  
  @IsOptional()
  newTests?: boolean;
  
  @IsOptional()
  positiveRate?: boolean;
  
  @IsOptional()
  testsPerCase?: boolean;
  
  @IsOptional()
  totalTests?: boolean;

  @IsOptional()
  newVaccinations?: boolean;

  @IsOptional()
  peopleFullyVaccinated?: boolean;

  @IsOptional()
  peopleVaccinated?: boolean;

  @IsOptional()
  totalBoosters?: boolean;

  @IsOptional()
  totalVaccinations?: boolean;
}

export type CountryCovidArgs = {
  countryIds?: number[];
  covidDataArgs: CountryDbQueryArgs;
  covidDataDefaults?: CountryDbQueryArgs;
  //dateRange?: { start?: Date; end?: Date };
};
