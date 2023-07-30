import { Injectable } from '@nestjs/common';
import { ContinentCovidRepository } from './continent-covid.repository';
import { ContinentCovidFilter } from './continent-covid.models';

@Injectable()
export class ContinentCovidService {
  constructor(private readonly continentCovidRepository: ContinentCovidRepository) {}

  findByContinentAndTime(filters: ContinentCovidFilter) {
    console.log(filters);
    return this.continentCovidRepository.findByCountryAndTime(filters);
  }
}
