import { Field, Float, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountryCovidCasesDto {
  @Field()
  date: Date;

  @Field(() => Int, { nullable: true })
  newCases: number | null;

  @Field(() => String, { nullable: true })
  totalCases?: string | number | null;
}

@ObjectType()
export class CountryCovidDeathsDto {
  @Field()
  date: Date;
  @Field(() => Int, { nullable: true })
  newDeaths?: number | null;
  @Field(() => String, { nullable: true })
  totalDeaths?: string | null;
}

@ObjectType()
export class CountryCovidHospitalizationsDto {
  @Field()
  date: Date;
  @Field(() => Int, { nullable: true })
  icuPatients?: number | null;
  @Field(() => Int, { nullable: true })
  hospPatients?: number | null;
  @Field(() => Int, { nullable: true })
  weeklyIcuAdmissions?: number | null;
  @Field(() => Int, { nullable: true })
  weeklyHospAdmissions?: number | null;
}

@ObjectType()
export class CountryCovidVaccinationsDto {
  @Field()
  date: Date;
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
}

@ObjectType()
export class CountryCovidTestsDto {
  @Field()
  date: Date;
  @Field(() => String, { nullable: true })
  totalTests?: string | null;
  @Field(() => Int, { nullable: true })
  newTests?: number | null;
  @Field(() => Float, { nullable: true })
  positiveRate?: number | null;
  @Field(() => Float, { nullable: true })
  testsPerCase?: number | null;
}

@InputType()
export class CountryCovidDataInput {
  @Field(() => [ID], { nullable: true })
  countryIds?: string[];

  @Field({ nullable: true })
  start?: Date;

  @Field({ nullable: true })
  end?: Date;
}
