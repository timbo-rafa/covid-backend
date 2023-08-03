import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType({
  description: "countries with flattened covid data ideal for table display"
})
export class CountryCovidTableDto {
  @Field(() => ID)
  id: string;

  @Field()
  isoCode: string;

  @Field()
  name: string;

  @Field(() => Date)
  date: Date;

  // covid cases
  @Field(() => Int, { nullable: true })
  newCases?: number | null;
  @Field(() => String, { nullable: true })
  totalCases?: string | null;

  // covid deaths
  @Field(() => Int, { nullable: true })
  newDeaths?: number | null;
  @Field(() => String, { nullable: true })
  totalDeaths?: string | null;

  // hospitalizations
  @Field(() => Int, { nullable: true })
  icuPatients?: number | null;
  @Field(() => Int, { nullable: true })
  hospPatients?: number | null;
  @Field(() => Int, { nullable: true })
  weeklyIcuAdmissions?: number | null;
  @Field(() => Int, { nullable: true })
  weeklyHospAdmissions?: number | null;

  // covid vaccinations
  @Field(() => String, { nullable: true })
  totalVaccinations?: string | null;
  @Field(() => String, { nullable: true })
  peopleVaccinated?: string | null;
  @Field(() => String, { nullable: true })
  peopleFullyVaccinated?: string | null;
  @Field(() => String, { nullable: true })
  totalBoosters?: string | null;
  @Field(() => Int, { nullable: true })
  newVaccinations?: number | null;

  // covid tests
  @Field(() => String, { nullable: true })
  totalTests?: string | null;
  @Field(() => Int, { nullable: true })
  newTests?: number | null;
  @Field(() => Int, { nullable: true })
  positiveRate?: number | null;
  @Field(() => Int, { nullable: true })
  testsPerCase?: number | null;
}
