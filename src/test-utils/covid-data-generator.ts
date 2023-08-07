import {
  ConfirmedCovidCases,
  ConfirmedCovidDeaths,
  CovidHospitalizations,
  CovidTests,
  CovidVaccinations,
  PrismaClient
} from '@prisma/client';

type GeneratorInput = { seed: number; rowsPerCountry: number };

export async function generateCovidData(prismaService: PrismaClient, { seed = 1, rowsPerCountry = 30 }: GeneratorInput) {
  const countryIds = Array.from({ length: 251 }, (_, i) => i + 1);

  const countryCovidCases = countryIds.flatMap((countryId) => generateCovidCases(countryId, { seed, rowsPerCountry }));
  const countryCovidTests = countryIds.flatMap((countryId) => generateCovidTests(countryId, { seed, rowsPerCountry }));
  const countryCovidDeaths = countryIds.flatMap((countryId) => generateCovidDeaths(countryId, { seed, rowsPerCountry }));
  const countryCovidHospitalizations = countryIds.flatMap((countryId) =>
    generateCovidHospitalizations(countryId, { seed, rowsPerCountry }),
  );
  const countryCovidVaccinations = countryIds.flatMap((countryId) =>
    generateCovidVaccinations(countryId, { seed, rowsPerCountry }),
  );

  console.log({
    countryCovidCases,
    countryCovidTests,
    countryCovidDeaths,
    countryCovidHospitalizations,
    countryCovidVaccinations,
  });

  const cases = prismaService.confirmedCovidCases.createMany({
    data: countryCovidCases,
    skipDuplicates: true,
  });
  const deaths = prismaService.confirmedCovidDeaths.createMany({
    data: countryCovidDeaths,
    skipDuplicates: true
  });
  const tests = prismaService.covidTests.createMany({
    data: countryCovidTests,
    skipDuplicates: true,
  });
  const hospitalizations = prismaService.covidHospitalizations.createMany({
    data: countryCovidHospitalizations,
    skipDuplicates: true,
  });
  const vaccinations = prismaService.covidVaccinations.createMany({
    data: countryCovidVaccinations,
    skipDuplicates: true,
  });

  const results = await prismaService.$transaction([cases, deaths, tests, hospitalizations, vaccinations]);

  console.log(JSON.stringify({ results }));

  return 1;
}

function generateCovidCases(countryId: number, { seed, rowsPerCountry }: GeneratorInput): ConfirmedCovidCases[] {
  return Array.from({ length: rowsPerCountry }, (_, rowNumber) => {
    const date = new Date();
    date.setUTCDate(date.getDate() - rowNumber);
    return {
      countryId,
      date,
      newCases: Math.ceil(10 * Math.abs(Math.sin(countryId + rowNumber)) + seed),
      totalCases: BigInt(countryId + rowNumber + seed + 100),
    };
  });
}

function generateCovidDeaths(countryId: number, { seed, rowsPerCountry }: GeneratorInput): ConfirmedCovidDeaths[] {
  return Array.from({ length: rowsPerCountry }, (_, rowNumber) => {
    const date = new Date();
    date.setUTCDate(date.getDate() - rowNumber);
    return {
      countryId,
      date,
      newDeaths: Math.ceil(8 * Math.abs(Math.sin(countryId + rowNumber)) + seed),
      totalDeaths: BigInt(countryId + rowNumber + seed),
    };
  });
}

function generateCovidTests(countryId: number, { seed, rowsPerCountry }: GeneratorInput): CovidTests[] {
  return Array.from({ length: rowsPerCountry }, (_, rowNumber) => {
    const date = new Date();
    date.setUTCDate(date.getDate() - rowNumber);
    return {
      countryId,
      date,
      newTests: Math.ceil(10 * Math.abs(Math.sin(countryId + rowNumber)) + seed),
      totalTests: BigInt(3 * (countryId + rowNumber + seed)),
      positiveRate: Math.abs(Math.sin(countryId + rowNumber)) + seed,
      testsPerCase: 5 * Math.abs(Math.sin(countryId + rowNumber / 10)) + seed,
    };
  });
}

function generateCovidHospitalizations(countryId: number, { seed, rowsPerCountry }: GeneratorInput): CovidHospitalizations[] {
  return Array.from({ length: rowsPerCountry }, (_, rowNumber) => {
    const date = new Date();
    date.setUTCDate(date.getDate() - rowNumber);
    return {
      countryId,
      date,
      hospPatients: 2 * (countryId + rowNumber + seed),
      icuPatients: 3 * (countryId + rowNumber + seed) - 10,
      weeklyHospAdmissions: countryId + rowNumber + seed,
      weeklyIcuAdmissions: countryId + rowNumber + seed,
    };
  });
}

function generateCovidVaccinations(countryId: number, { seed, rowsPerCountry }: GeneratorInput): CovidVaccinations[] {
  return Array.from({ length: rowsPerCountry }, (_, rowNumber) => {
    const date = new Date();
    date.setUTCDate(date.getDate() - rowNumber);
    return {
      countryId,
      date,
      newVaccinations: Math.ceil(3 * Math.abs(Math.sin(countryId + 1.5 * rowNumber)) + seed),
      peopleFullyVaccinated: BigInt(countryId + rowNumber + seed + 50),
      peopleVaccinated: BigInt(countryId + rowNumber + seed + 40),
      totalBoosters: BigInt(countryId + rowNumber + seed + 200),
      totalVaccinations: BigInt(countryId + rowNumber + seed + 600),
    };
  });
}