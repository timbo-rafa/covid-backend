export type ConfirmedCasesCreateModel = {
  countryId: number
  date: Date 
  newCases?: number
  totalCases?: bigint | number
}