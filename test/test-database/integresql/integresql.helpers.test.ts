export type IntegresqlTestEnv = {
  testDbName?: string;
  integresqlSchema?: string;
  optimizeTestDb?: string;
};

export function setIntegresqlTestEnv() {
  const testDbName = process.env.TEST_DB_NAME;
  const integresqlSchema = process.env.INTEGRESQL_SCHEMA;
  const optimizeTestDb = process.env.OPTIMIZE_TEST_DB;

  const id = new Date().getTime().toString();
  process.env.TEST_DB_NAME = `integresql_setup_test_${id}`;
  process.env.OPTIMIZE_TEST_DB = 'true';

  return {
    uuid: id,
    env: getIntegresqlEnv(),
    previousEnv: {
      testDbName,
      integresqlSchema,
      optimizeTestDb,
    },
  };
}

export function restoreIntegresqlTestEnv(env: IntegresqlTestEnv) {
  const { testDbName, integresqlSchema, optimizeTestDb } = env;

  process.env.TEST_DB_NAME = testDbName;
  process.env.INTEGRESQL_SCHEMA = integresqlSchema;
  process.env.OPTIMIZE_TEST_DB = optimizeTestDb;
}

function getIntegresqlEnv(): IntegresqlTestEnv {
  return {
    testDbName: process.env.TEST_DB_NAME,
    integresqlSchema: process.env.INTEGRESQL_SCHEMA,
    optimizeTestDb: process.env.OPTIMIZE_TEST_DB,
  };
}
