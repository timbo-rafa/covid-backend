import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountryCovidCasesDto } from './country-covid-cases.dto';

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
}
