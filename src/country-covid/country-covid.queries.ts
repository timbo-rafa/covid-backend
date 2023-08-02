import { Prisma } from '@prisma/client';
import { Args } from '@prisma/client/runtime/library';
import { CountryDbQueryArgs } from './country-covid.entities';

function applyDefault<T>(argValue: T | undefined, defaultValue: T) {
  return argValue !== undefined ? argValue : defaultValue;
}

export function selectCovidCases<ExtArgs extends Args>(
  args: Prisma.Country$covidCasesArgs<ExtArgs> | undefined,
  defaults: Prisma.Country$covidCasesArgs<ExtArgs> | undefined,
) {
  if (args) {
    return Prisma.validator<Prisma.Country$covidCasesArgs>()({
      where: {
        date: applyDefault(args.where?.date, defaults?.where?.date),
      },
      select: {
        date: applyDefault(args.select?.date, defaults?.select?.date),
        newCases: applyDefault(args.select?.newCases, defaults?.select?.newCases),
        totalCases: applyDefault(args.select?.totalCases, defaults?.select?.totalCases),
      },
    });
  }
}

export function selectCovidDeaths<ExtArgs extends Args>(
  args: Prisma.Country$covidDeathsArgs<ExtArgs> | undefined,
  defaults: Prisma.Country$covidDeathsArgs<ExtArgs> | undefined,
) {
  if (args) {
    return Prisma.validator<Prisma.Country$covidDeathsArgs>()({
      where: {
        date: applyDefault(args.where?.date, defaults?.where?.date),
      },
      select: {
        date: applyDefault(args.select?.date, defaults?.select?.date),
        newDeaths: applyDefault(args.select?.newDeaths, defaults?.select?.newDeaths),
        totalDeaths: applyDefault(args.select?.totalDeaths, defaults?.select?.totalDeaths),
      },
    });
  }
}

export function selectCovidHospitalizations<ExtArgs extends Args>(
  args: Prisma.Country$covidHospitalizationsArgs<ExtArgs> | undefined,
  defaults: Prisma.Country$covidHospitalizationsArgs<ExtArgs> | undefined,
) {
  if (args) {
    return Prisma.validator<Prisma.Country$covidHospitalizationsArgs>()({
      where: {
        date: applyDefault(args.where?.date, defaults?.where?.date),
      },
      select: {
        date: applyDefault(args.select?.date, defaults?.select?.date),
        hospPatients: applyDefault(args.select?.hospPatients, defaults?.select?.hospPatients),
        weeklyHospAdmissions: applyDefault(args.select?.weeklyHospAdmissions, defaults?.select?.weeklyHospAdmissions),
        weeklyIcuAdmissions: applyDefault(args.select?.weeklyIcuAdmissions, defaults?.select?.weeklyIcuAdmissions),
        icuPatients: applyDefault(args.select?.icuPatients, defaults?.select?.icuPatients),
      },
    });
  }
}

export function selectCovidVaccinations<ExtArgs extends Args>(
  args: Prisma.Country$covidVaccinationsArgs<ExtArgs> | undefined,
  defaults: Prisma.Country$covidVaccinationsArgs<ExtArgs> | undefined,
) {
  if (args) {
    return Prisma.validator<Prisma.Country$covidVaccinationsArgs>()({
      where: {
        date: applyDefault(args.where?.date, defaults?.where?.date),
      },
      select: {
        date: applyDefault(args.select?.date, defaults?.select?.date),
        newVaccinations: applyDefault(args.select?.newVaccinations, defaults?.select?.newVaccinations),
        peopleFullyVaccinated: applyDefault(args.select?.peopleFullyVaccinated, defaults?.select?.peopleFullyVaccinated),
        peopleVaccinated: applyDefault(args.select?.peopleVaccinated, defaults?.select?.peopleVaccinated),
        totalBoosters: applyDefault(args.select?.totalBoosters, defaults?.select?.totalBoosters),
        totalVaccinations: applyDefault(args.select?.totalVaccinations, defaults?.select?.totalVaccinations),
      },
    });
  }
}

export function selectCovidTests<ExtArgs extends Args>(
  args: Prisma.Country$covidTestsArgs<ExtArgs> | undefined,
  defaults: Prisma.Country$covidTestsArgs<ExtArgs> | undefined,
) {
  if (args) {
    return Prisma.validator<Prisma.Country$covidTestsArgs>()({
      where: {
        date: applyDefault(args.where?.date, defaults?.where?.date),
      },
      select: {
        date: applyDefault(args.select?.date, defaults?.select?.date),
        newTests: applyDefault(args.select?.newTests, defaults?.select?.newTests),
        totalTests: applyDefault(args.select?.totalTests, defaults?.select?.totalTests),
        testsPerCase: applyDefault(args.select?.testsPerCase, defaults?.select?.testsPerCase),
        positiveRate: applyDefault(args.select?.positiveRate, defaults?.select?.positiveRate),
      },
    });
  }
}

export function includeCovidDataInCountryQuery(args: CountryDbQueryArgs, defaults: CountryDbQueryArgs | undefined) {
  return Prisma.validator<Prisma.CountryFindManyArgs>()({
    include: {
      covidCases: selectCovidCases(args.covidCases, defaults?.covidCases),
      covidDeaths: selectCovidDeaths(args.covidDeaths, defaults?.covidDeaths),
      covidHospitalizations: selectCovidHospitalizations(args.covidHospitalizations, defaults?.covidHospitalizations),
      covidTests: selectCovidTests(args.covidTests, defaults?.covidTests),
      covidVaccinations: selectCovidVaccinations(args.covidVaccinations, defaults?.covidVaccinations),
    },
  });
}
