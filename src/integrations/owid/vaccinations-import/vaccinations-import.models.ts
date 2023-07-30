export type VaccinationsCreateModel = {
  countryId: number
  date: Date
  totalVaccinations?: number
  peopleVaccinated?: number
  peopleFullyVaccinated?: number
  totalBoosters?: number
  newVaccinations?: number
}