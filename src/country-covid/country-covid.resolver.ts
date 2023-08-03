import { CountryCovidDataInput, CountryCovidTableDto, CountryDto } from '@dtos';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';
import { AllCovidDataFields } from './country-covid.models';
import { CountryCovidService } from './country-covid.service';

@Resolver()
export class CountryCovidResolver {
  constructor(private readonly countryCovidService: CountryCovidService) {}

  @Query(() => [CountryDto])
  async countryCovidData(
    @Args('countryCovidDataInput') input: CountryCovidDataInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CountryDto[]> {
    const countryIds = input.countryIds?.map((ids) => Number(ids));

    const countries = await this.countryCovidService.findByCountryAndTime({
      countryIds,
      dateRange: { start: input.start, end: input.end },
      selectCovidFields: this.getSetOfrequestedFields(info),
    });

    return countries.map((country) => ({ ...country, id: String(country.id) }));
  }

  @Query(() => [CountryCovidTableDto])
  async countryCovidTableData(
    @Args('countryCovidDataInput') input: CountryCovidDataInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CountryCovidTableDto[]> {
    const countryIds = input.countryIds?.map((ids) => Number(ids));

    return this.countryCovidService.findCountryCovidTableDataByCountryAndTime({
      countryIds,
      dateRange: { start: input.start, end: input.end },
      selectCovidFields: this.getSetOfrequestedFields(info),
    });
  }

  private getSetOfrequestedFields(info: GraphQLResolveInfo) {
    const requestedFields: Partial<Record<keyof CountryCovidTableDto, {}>> = graphqlFields(info);
    delete requestedFields.id;
    delete requestedFields.isoCode;
    delete requestedFields.name;

    const selectedCovidFieldsSet = new Set<AllCovidDataFields>(Object.keys(requestedFields) as AllCovidDataFields[]);

    return selectedCovidFieldsSet.add('date');
  }
}
