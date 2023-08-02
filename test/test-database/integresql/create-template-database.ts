import { PrismaService } from "@data-layer";
import { DbConfig, getTestDbConnectionString } from "../test-database.config";
import { IntegresqlClient } from "./integresql.client";
import { execSync } from "child_process";
import { Client} from 'pg';

export async function createTemplateDatabaseForTests() {
  try {
    const dbConfig = await initializeTemplateDatabase();
    await deployMigrations(dbConfig);
    await finalizeTemplate();
    return dbConfig;
  } catch (e) {
    console.log('error createTemplateDatabaseForTests:', e);
    throw e;
  }
}

async function initializeTemplateDatabase() {
  const testDbManager = new IntegresqlClient();
  await testDbManager.initializeTemplate();

  const connectionString = testDbManager.getTemplateDbConnectionString();
  process.env.DATABASE_URL = connectionString;
  console.log('Initialized test database template:', connectionString);

  return testDbManager.getTemplateDbConfig();
}

export async function deployMigrations(dbConfig: DbConfig) {
  const connString = getTestDbConnectionString(dbConfig);
  process.env.DATABASE_URL = connString;
  await createTimescaleDb(dbConfig);
  execSync(`DATABASE_URL=${connString} yarn db:deploy`);
  console.log('Migrated test database template');
}

async function finalizeTemplate() {
  const testDbManager = new IntegresqlClient();
  await testDbManager.finalizeTemplate();
  console.log('Finalized test database template');
}

async function createTimescaleDb(dbConfig: DbConfig) {
  await createDb(dbConfig);
  const config = { connectionString: getTestDbConnectionString(dbConfig) };
  const client = new Client(config);
  try {
    await client.connect();
    await client.query('CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;');
    console.log('Created Extension Timescaledb');
  } catch (e) {
    console.log('Error creating timescaledb:', e);
    throw e;
  } finally {
    await client.end();
  }
}

function getPostgresqlClient(dbConfig: DbConfig) {
  const driverDbConnString = getTestDbConnectionString({
    ...dbConfig,
    database: 'postgres',
  });
  const driverDbConfig = { connectionString: driverDbConnString };
  const driverDbClient = new Client(driverDbConfig);
  return driverDbClient;
}

async function createDb(dbConfig: DbConfig) {
  if (dbConfig.alreadyExists) {
    return;
  }

  const driverDbClient = getPostgresqlClient(dbConfig);
  try {
    await driverDbClient.connect();
    await driverDbClient.query(`CREATE DATABASE "${dbConfig.database}"`);
  } catch (e) {
    console.log('Error creating test db:', e);
    throw e;
  } finally {
    await driverDbClient.end();
  }
}

export async function deleteDatabase(dbConfig: DbConfig, database: string) {
  const driverDbClient = getPostgresqlClient(dbConfig);
  try {
    await driverDbClient.connect();
    await driverDbClient.query(`DROP DATABASE "${database}" WITH (FORCE)`);
  } catch (e) {
    console.log('Error deleting db:', e);
    throw e;
  } finally {
    await driverDbClient.end();
  }
}
