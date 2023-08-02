import { getTestDbConnectionString } from '../test-database.config';
import { createTemplateDatabaseForTests } from './create-template-database';
import { IntegresqlClient } from './integresql.client';
import { IntegresqlTestEnv, setIntegresqlTestEnv, restoreIntegresqlTestEnv } from './integresql.helpers.test';

describe.skip('e2e Integresql Test Database', () => {
  let envSave: IntegresqlTestEnv;

  beforeEach(() => {
    const { previousEnv } = setIntegresqlTestEnv();
    envSave = previousEnv;
  });
  afterEach(() => restoreIntegresqlTestEnv(envSave));

  it('should create template database and seed it', async () => {
    const actualDbConfig = await createTemplateDatabaseForTests();
    const actualConnString = getTestDbConnectionString(actualDbConfig);

    const integresqlClient = new IntegresqlClient();
    const expectedConnString = integresqlClient.getTemplateDbConnectionString();
    expect(actualConnString).toEqual(expectedConnString);
  }, 10000);
});
