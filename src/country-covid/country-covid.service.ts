import { Injectable } from '@nestjs/common';
import { CountryCovidRepository } from './country-covid.repository';
import { CountryCovidFilter } from './country-covid.models';

@Injectable()
export class CountryCovidService {
  constructor(private readonly countryCovidRepository: CountryCovidRepository) {}

  findByCountryAndTime(filters: CountryCovidFilter) {
    console.log(filters);
    return this.countryCovidRepository.findByCountryAndTime(filters);
  }
}
