import { PrismaService } from '@data-layer';
import { CovidVaccinations, Prisma } from '@prisma/client';
import { Args, DefaultArgs } from '@prisma/client/runtime/library';
import { DateRange } from '@utils';

function applyDefault<T>(argValue: T | undefined, defaultValue: T) {
  return argValue !== undefined ? argValue : defaultValue;
}

function selectCovidCases<ExtArgs extends Args>(
  args: Prisma.Country$covidCasesArgs<ExtArgs>,
  defaults?: Prisma.Country$covidCasesArgs<ExtArgs>,
) {
  return Prisma.validator<Prisma.Country$covidCasesArgs>()({
    where: {
      date: applyDefault(args.where?.date, defaults?.where?.date)
    },
    select: {
      date: applyDefault(args.select?.date, defaults?.select?.date),
      newCases: applyDefault(args.select?.newCases, defaults?.select?.newCases),
      totalCases: applyDefault(
        args.select?.totalCases,
        defaults?.select?.totalCases,
      ),
    },
  });
}

function selectCovidDeaths<ExtArgs extends Args>(
  args: Prisma.ConfirmedCovidDeathsSelect<ExtArgs>,
  defaults?: Prisma.ConfirmedCovidDeathsSelect<ExtArgs>,
) {
  return {};
}

export type CountryDbQueryArgs = {
  covidCases: ReturnType<typeof selectCovidCases>;
  // confirmedCovidDeaths:
  // covidHospitalizations:
  // covidTests:
  // covidVaccinations:
};

export function includeCovidDataInCountryQuery<ExtArgs extends Args>(args: CountryDbQueryArgs, defaults: CountryDbQueryArgs | undefined) {
  return Prisma.validator<Prisma.CountryFindManyArgs>()({
    include: {
      covidCases: {
        ...selectCovidCases(
          args.covidCases,
          defaults?.covidCases,
        ),
      },
      // date: applyDefault(args.select.date, defaults.select.date),
      // newCases: applyDefault(args.select.newCases, defaults.select.newCases),
      // totalCases
      // confirmedCovidDeaths: {
      //   select: {
      //     date,
      //     newDeaths,
      //     totalDeaths,
      //   },
      // },
      // covidHospitalizations: {
      //   select: {
      //     date,
      //     hospPatients,
      //     icuPatients,
      //     weeklyHospAdmissions,
      //     weeklyIcuAdmissions,
      //   },
      // },
      // covidTests: {
      //   select: {
      //     date,
      //     newTests,
      //     positiveRate,
      //     testsPerCase,
      //     totalTests,
      //   },
      // },
      // covidVaccinations: {
      //   select: {
      //     date,
      //     newVaccinations,
      //     peopleFullyVaccinated,
      //     peopleVaccinated,
      //     totalBoosters,
      //     totalVaccinations,
      //   },
      // },
    },
  });
}
