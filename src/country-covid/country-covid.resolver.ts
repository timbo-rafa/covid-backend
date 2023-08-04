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

    const countries = await this.countryCovidService.findCountryCovidDataByCountryAndTime({
      countryIds,
      dateRange: { start: input.start, end: input.end },
      selectCovidFields: this.getSetOfRequestedCountryDtoFields(info),
    });

    return countries;
  }

  private getSetOfRequestedCountryDtoFields(info: GraphQLResolveInfo) {
    const requestedFields: Partial<Record<keyof CountryDto, {}>> = graphqlFields(info);
    delete requestedFields.id;
    delete requestedFields.isoCode;
    delete requestedFields.name;
    const selectedCovidFieldsSet = new Set<AllCovidDataFields>([
      ...Object.keys(requestedFields.covidCases || {}),
      ...Object.keys(requestedFields.covidDeaths || {}),
      ...Object.keys(requestedFields.covidTests || {}),
      ...Object.keys(requestedFields.covidHospitalizations || {}),
      ...Object.keys(requestedFields.covidVaccinations || {}),
    ] as AllCovidDataFields[]);

    return selectedCovidFieldsSet.add('date');
  }

  @Query(() => [CountryCovidTableDto])
  async countryCovidTableData(
    @Args('countryCovidDataInput') input: CountryCovidDataInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<CountryCovidTableDto[]> {
    const countryIds = input.countryIds?.map((ids) => Number(ids));

    const countryData = await this.countryCovidService.findCountryCovidTableDataByCountryAndTime({
      countryIds,
      dateRange: { start: input.start, end: input.end },
      selectCovidFields: this.getSetOfrequestedTableDtoFields(info),
    });

    console.log(`${this.countryCovidTableData.name} returning ${countryData.length} rows`);
    console.log(countryData);

    return countryData;
  }

  private getSetOfrequestedTableDtoFields(info: GraphQLResolveInfo) {
    const requestedFields: Partial<Record<keyof CountryCovidTableDto, {}>> = graphqlFields(info);
    delete requestedFields.id;
    delete requestedFields.isoCode;
    delete requestedFields.name;

    const selectedCovidFieldsSet = new Set<AllCovidDataFields>(Object.keys(requestedFields) as AllCovidDataFields[]);

    return selectedCovidFieldsSet.add('date');
  }
}
