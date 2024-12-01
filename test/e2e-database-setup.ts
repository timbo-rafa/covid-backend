import { IntegreSQLClient, IntegreSQLDatabaseConfig } from '@devoxa/integresql-client';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import path from 'path';

// options.url: The URL of the IntegreSQL instance
const integreSQL = new IntegreSQLClient({ url: 'http://localhost:5002' });

function getLocalhostUrl(databaseConfig: IntegreSQLDatabaseConfig) {
  return integreSQL.databaseConfigToConnectionUrl({ ...databaseConfig, host: 'localhost' });
}

export function setupTestDatabase() {
  let hash: string;
  beforeAll(async () => {
    // The hash can be generated in any way that fits your business logic, the included
    // helper creates a SHA1 hash of the file content of all files matching the glob patterns.
    hash = await integreSQL.hashFiles(['./prisma/**/*']);
    await integreSQL.initializeTemplate(hash, initializeTemplate);
  });

  let prismaService: PrismaClient;
  beforeEach(async () => {
    const databaseConfig = await integreSQL.getTestDatabase(hash);
    const connectionUrl = getLocalhostUrl(databaseConfig);

    console.log(`Using test database url: ${connectionUrl}`);
    prismaService = new PrismaClient({ datasourceUrl: connectionUrl });
  });
  afterEach(async () => await prismaService.$disconnect());

  const getPrismaTestService = () => prismaService;

  return { getPrismaTestService };
}

async function initializeTemplate(databaseConfig: IntegreSQLDatabaseConfig) {
  const connectionUrl = getLocalhostUrl(databaseConfig);

  migrateTemplateDatabase(connectionUrl);
  // await seedTemplateDatabase(databaseConfig);
  // await prisma.$disconnect();
}

function migrateTemplateDatabase(connectionUrl: string) {
  const prismaBin = path.join(process.cwd(), './node_modules/.bin/prisma');
  const env = { DATABASE_URL: connectionUrl, PATH: process.env.PATH };
  const stdout = execSync(`${prismaBin} db push --force-reset --skip-generate`, { env });
  console.log(stdout);
}

// async function seedTemplateDatabase() {
//   prisma = new PrismaClient({ datasources: { database: { url: connectionUrl } } });
//   await seed(prisma);
// }
