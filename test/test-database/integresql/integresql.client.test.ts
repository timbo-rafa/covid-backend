import { getTestDbConfig } from '../test-database.config';
import { IntegresqlClient } from './integresql.client';
import { IntegresqlTestEnv, setIntegresqlTestEnv, restoreIntegresqlTestEnv } from './integresql.helpers.test';
import { GetDatabaseResponse, InitializeTemplateResponse } from './integresql.types';

// These Integresql tests should be executed sequentially click on "Run" above describe
// click on "Run" above describe on VS code using extension firsttris.vscode-jest-runner
describe.skip('Integresql Client test', () => {
  let hash: string;
  let schema: string | undefined;
  let envSave: IntegresqlTestEnv;
  let uuid: string;
  beforeAll(() => {
    const { env, previousEnv, uuid: dbUuid } = setIntegresqlTestEnv();
    hash = env.testDbName || 'test_db';
    schema = env.integresqlSchema;
    envSave = previousEnv;

    uuid = dbUuid;
  });

  afterAll(() => restoreIntegresqlTestEnv(envSave));

  it('should initialize template', async () => {
    const client = new IntegresqlClient();

    const response = await client.initializeTemplate();

    expect(response).toEqual(getExpectedInitializeReponse());
  });

  it('should finalize template', async () => {
    const client = new IntegresqlClient();

    const response = await client.finalizeTemplate();

    expect(response).toHaveProperty('status', 204);
  });

  it('should get database', async () => {
    const client = new IntegresqlClient();

    const response = await client.getDatabase();

    expect(response).toEqual<GetDatabaseResponse>(getExpectedGetReponse());
  });

  it('should delete database', async () => {
    const client = new IntegresqlClient();

    const response = await client.setDatabaseDirtyFlagToFalse(0);

    expect(response).toHaveProperty('status', 204);
  });

  function getExpectedInitializeReponse(): InitializeTemplateResponse {
    const config = getTestDbConfig({
      database: `covid_template_integresql_setup_test_${uuid}`,
      host: expect.stringContaining('timescale'),
      schema,
    });

    delete config.schema;
    return {
      database: {
        config,
        templateHash: hash,
      },
    };
  }

  function getExpectedGetReponse(): GetDatabaseResponse {
    const config = getTestDbConfig({
      database: `covid_instance_integresql_setup_test_${uuid}_000`,
      host: expect.stringContaining('timescale'),
      schema,
    });

    delete config.schema;
    return {
      id: 0,
      database: {
        config,
        templateHash: hash,
      },
    };
  }
});
