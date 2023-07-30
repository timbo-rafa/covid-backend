export type HospitalizationsCreateModel = {
  countryId: number
  date: Date
  icuPatients?: number
  hospPatients?: number
  weeklyIcuAdmissions?: number
  weeklyHospAdmissions?: number
}