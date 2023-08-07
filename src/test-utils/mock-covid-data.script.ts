import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';
import { generateCovidData } from './covid-data-generator';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function runScript() {
  console.log('Mocking covid data on the database\n');
  rl.question('\n\n Give me a seed (default 1)\n', async (seed) => {
    const client = new PrismaClient();
    try {
      await generateCovidData(client, {
        seed: Number(seed) || 1,
        rowsPerCountry: 30,
      });
      await client.$disconnect();
      console.log('seed success!');
      process.exit();
    } catch (e) {
      console.log('seed error:', e);
      await client.$disconnect();
      process.exit(1);
    }
  });
})();
