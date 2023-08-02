import { PrismaService } from '@data-layer';
import { IntegresqlClient, TestDatabaseNotFoundError } from './integresql/integresql.client';
import { DbConfig } from './test-database.config';
import { createTemplateDatabaseForTests } from './integresql/create-template-database';

export function setupTestDatabase() {
  const testDbManager = new IntegresqlClient();
  let prismaService: PrismaService | undefined;
  let dbConfig: DbConfig;

  // Generate the pg connection string for the db instance of the template database (one per test)
  beforeEach(async () => {
    const db = await getDatabase(testDbManager);
    dbConfig = db.database.config;

    const connectionString = testDbManager.getInstanceDbConnectionString(dbConfig);
    console.log(connectionString);
    const clientArg = { datasources: { db: { url: connectionString } } };
    prismaService = new PrismaService(clientArg);
  });

  afterEach(async () => {
    if (prismaService) {
      await prismaService.$disconnect();
      prismaService = undefined;
      return;
    }
    console.warn(
      `afterEach: could not disconnect from prismaClient=${prismaService} , likely due to an error on db optimized-provider setup. Please see previous errors`,
    );
  });

  return {
    getTestDbService: () => {
      assertPrismaServiceIsDefined(prismaService);
      return prismaService;
    },
    // enableHooks: (app) => {
    //   assertDbClientIsDefined(prismaClient);
    //   return prismaClient.enableShutdownHooks(app as INestApplication);
    // },
  };
}

class TestDatabaseProviderError extends Error {
  name = TestDatabaseProviderError.name;
}
export function assertPrismaServiceIsDefined(client: PrismaService | undefined): asserts client is PrismaService {
  if (!client) {
    throw new TestDatabaseProviderError('Database client requested, but undefined');
  }
}

async function getDatabase(testDbManager: IntegresqlClient) {
  try {
    const db = await testDbManager.getDatabase();
    return db;
  } catch (e) {
    if (e instanceof TestDatabaseNotFoundError) {
      await autoCreateTestDatabase();
      return testDbManager.getDatabase();
    }
    throw e;
  }
}

async function autoCreateTestDatabase() {
  console.log('Optimized test database has not been setup. Creating...');
  const connString = await createTemplateDatabaseForTests();

  return connString;
}
