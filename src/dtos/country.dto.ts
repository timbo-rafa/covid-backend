import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { CountryCovidCasesDto, CountryCovidDeathsDto, CountryCovidHospitalizationsDto, CountryCovidTestsDto, CountryCovidVaccinationsDto } from './country-covid-data.dto';

@ObjectType()
export class CountryDto {
  @Field(() => ID)
  id: string;

  @Field()
  isoCode: string;

  @Field()
  name: string;

  @Field(() => [CountryCovidCasesDto])
  covidCases: CountryCovidCasesDto[];

  @Field(() => [CountryCovidDeathsDto])
  covidDeaths: CountryCovidDeathsDto[];

  @Field(() => [CountryCovidVaccinationsDto])
  covidVaccinations: CountryCovidVaccinationsDto[];

  @Field (() => [CountryCovidTestsDto])
  covidTests: CountryCovidTestsDto[];

  @Field(() => [CountryCovidHospitalizationsDto])
  covidHospitalizations: CountryCovidHospitalizationsDto[];
}
