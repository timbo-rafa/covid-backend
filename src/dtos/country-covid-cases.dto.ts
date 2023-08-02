import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CountryCovidCasesDto {
  @Field()
  date: Date;

  @Field(() => Int, {nullable: true})
  newCases: number | null;

  @Field(() => String, {nullable: true})
  totalCases: bigint | number | null;
}

@InputType()
export class CountryCovidDataInput {
  @Field(() => [ID], { nullable: true })
  countryIds?: string[];

  @Field({nullable: true})
  start?: Date;

  @Field({nullable: true})
  end?: Date;
}