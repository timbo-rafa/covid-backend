import { CountryCovidDataInput, CountryDto } from '@dtos';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';
import { AllCovidDataFields } from './country-covid.models';
import { CountryCovidService } from './country-covid.service';

@Resolver()
export class CountryCovidResolver {
  constructor(private readonly countryCovidService: CountryCovidService) {}

  @Query(() => [CountryDto])
  covidData(@Args('countryCovidDataInput') input: CountryCovidDataInput, @Info() info: GraphQLResolveInfo) {
    const countryIds = input.countryIds?.map((ids) => Number(ids));

    return this.countryCovidService.findByCountryAndTime({
      countryIds,
      dateRange: { start: input.start, end: input.end },
      selectCovidDataFields: this.getSetOfrequestedFields(info),
    });
  }

  private getSetOfrequestedFields(info: GraphQLResolveInfo) {
    const requestedFields = graphqlFields(info);
    const covidCaseFields = requestedFields?.covidCases;

    const selectedCovidDataFields = new Set<AllCovidDataFields>();
    if (!covidCaseFields) {
      return selectedCovidDataFields;
    }

    for (const field in covidCaseFields) {
      selectedCovidDataFields.add(field as AllCovidDataFields);
    }

    return selectedCovidDataFields;
  }
}
