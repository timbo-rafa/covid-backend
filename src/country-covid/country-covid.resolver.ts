import { CountryCovidDataInput, CountryDto } from '@dtos';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';
import {  CovidCaseFields } from './country-covid.models';
import { CountryCovidService } from './country-covid.service';

@Resolver()
export class CountryCovidResolver {
  constructor(private readonly countryCovidService: CountryCovidService) {}

  @Query(() => [CountryDto])
  countryCovidData(@Args('countryCovidDataInput') input: CountryCovidDataInput, @Info() info: GraphQLResolveInfo) {
    const countryIds = input.countryIds?.map((ids) => Number(ids));

    return this.countryCovidService.findByCountryAndTime({
      countryIds,
      dateRange: { start: input.start, end: input.end },
      selectCovidCasesDataFields: this.getSetOfrequestedFields(info),
    });
  }

  private getSetOfrequestedFields(info: GraphQLResolveInfo) {
    const requestedFields = graphqlFields(info);
    const covidCaseFields = requestedFields?.covidCases;

    const selectedCovidCasesFields = new Set<CovidCaseFields>();
    if (!covidCaseFields) {
      return selectedCovidCasesFields;
    }

    for (const field in covidCaseFields) {
      selectedCovidCasesFields.add(field as CovidCaseFields);
    }

    return selectedCovidCasesFields;
  }
}
