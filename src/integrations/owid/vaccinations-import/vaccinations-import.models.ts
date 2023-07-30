export type VaccinationsCreateModel = {
  countryId: number;
  date: Date;
  totalVaccinations?: bigint | number;
  peopleVaccinated?: bigint | number;
  peopleFullyVaccinated?: bigint | number;
  totalBoosters?: bigint | number;
  newVaccinations?: number;
};
