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

  @Field()
  date: Date;

  // covid cases
  @Field(() => Int, { nullable: true })
  newCases: number | null;
  @Field(() => String, { nullable: true })
  totalCases: bigint | number | null;

  // covid deaths
  @Field(() => Int, { nullable: true })
  newDeaths: number | null;
  @Field(() => String, { nullable: true })
  totalDeaths: bigint | number | null;

  // hospitalizations
  @Field(() => Int, { nullable: true })
  icuPatients: number | null;
  @Field(() => Int, { nullable: true })
  hospPatients: number | null;
  @Field(() => Int, { nullable: true })
  weeklyIcuAdmissions: number | null;
  @Field(() => Int, { nullable: true })
  weeklyHospAdmissions: number | null;

  // covid vaccinations
  @Field(() => String, { nullable: true })
  totalVaccinations: bigint | number | null;
  @Field(() => String, { nullable: true })
  peopleVaccinated: bigint | number | null;
  @Field(() => String, { nullable: true })
  peopleFullyVaccinated: bigint | number | null;
  @Field(() => String, { nullable: true })
  totalBoosters: bigint | number | null;
  @Field(() => Int, { nullable: true })
  newVaccinations: number | null;

  // covid tests
  @Field(() => String, { nullable: true })
  totalTests: bigint | number | null;
  @Field(() => Int, { nullable: true })
  newTests: number | null;
  @Field(() => Int, { nullable: true })
  positiveRate: number | null;
  @Field(() => Int, { nullable: true })
  testsPerCase: number | null;
}
