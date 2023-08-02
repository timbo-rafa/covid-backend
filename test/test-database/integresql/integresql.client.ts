import fetch, { Response } from 'node-fetch';
import { DbConfig, getTestDbConfig, getTestDbConnectionString } from '../test-database.config';
import { GetDatabaseResponse, InitializeTemplateResponse } from './integresql.types';

export class IntegresqlError extends Error {}

export class TestDatabaseNotFoundError extends IntegresqlError {}


export class IntegresqlClient {
  private host: string;
  private port: number;
  private templatesUrl: string;
  private contentTypeJson = { 'content-type': 'application/json' };
  private dbConfig: DbConfig;

  constructor() {
    this.dbConfig = getTestDbConfig();
    this.host = process.env.INTEGRESQL_HOST || '127.0.0.1';
    this.port = Number(process.env.INTEGRESQL_PORT) || 5001;

    const url = 'http://' + this.host + ':' + this.port;
    this.templatesUrl = url + '/api/v1/templates';
  }

  async initializeTemplate(hash: string = this.dbConfig.database): Promise<InitializeTemplateResponse> {
    const body = {
      hash: hash,
    };

    const res = await fetch(this.templatesUrl, {
      body: JSON.stringify(body),
      method: 'post',
      headers: { ...this.contentTypeJson },
    });
    return this.parseInitializeTemplateResponse(res);
  }

  private async parseInitializeTemplateResponse(res: Response) {
    const data: InitializeTemplateResponse = await res.json();

    if (this.templateAlreadyExists(res.status)) {
      console.log('WARN: Integresql Template Db was already initialized, but continuing...');

      // return data;
    }

    if (data.message) {
      throw new IntegresqlError(`Integresql Error: ${data.message}`);
    }

    return data;
  }

  private templateAlreadyExists(responseStatus: number) {
    return responseStatus === 423;
  }

  finalizeTemplate(hash: string = this.dbConfig.database) {
    return fetch(this.templatesUrl + '/' + hash, {
      method: 'put',
      headers: { ...this.contentTypeJson },
    });
  }

  async discardTemplate(hash: string = this.dbConfig.database) {
    const res = await fetch(this.templatesUrl + '/' + hash, {
      method: 'delete',
      headers: { ...this.contentTypeJson },
    });
    return await res.json();
  }

  async getDatabase(hash: string = this.dbConfig.database): Promise<GetDatabaseResponse> {
    const res = await fetch(this.templatesUrl + '/' + hash + '/tests', {
      headers: { ...this.contentTypeJson },
    });
    return this.parseGetDatabaseResponse(res);
  }

  private async parseGetDatabaseResponse(res: Response) {
    const data: GetDatabaseResponse = await res.json();
    if (this.testDatabaseNotFoundResponse(res)) {
      throw new TestDatabaseNotFoundError(
        `Integresql Error: ${data.message}. Have you seeded the test database template (yarn db:seed-e2e)?`
      );
    }

    if (data.message) {
      throw new IntegresqlError(`Integresql Error (status=${res.status}): ${data.message}`);
    }

    return data;
  }

  private testDatabaseNotFoundResponse(response: Response) {
    return response.status === 404;
  }

  /**
   * this sets the dirty flag to false on integresql,
   * meaning DB WILL BE REUSED FOR ANOTHER TEST.
   * Usually that's not what we want.
   * https://github.com/allaboutapps/integresql/issues/2#issuecomment-739919478
   */
  async setDatabaseDirtyFlagToFalse(dbId: number, hash: string = this.dbConfig.database) {
    return fetch(this.templatesUrl + '/' + hash + '/tests/' + dbId, {
      method: 'delete',
      headers: { ...this.contentTypeJson },
    });
  }

  getTemplateDbConfig(): DbConfig {
    const config = getTestDbConfig({
      ...this.dbConfig,
      database: this.getIntegresqlPrefix() + this.getTemplateDbPrefix() + this.dbConfig.database,
      schema: this.dbConfig.schema,
      alreadyExists: true,
    });
    return config;
  }

  getTemplateDbConnectionString() {
    const config: DbConfig = this.getTemplateDbConfig();
    return getTestDbConnectionString(config);
  }

  getInstanceDbConnectionString(integresqlConfig: DbConfig) {
    const config: DbConfig = {
      ...this.getDirectConfigToDb(integresqlConfig),
      schema: integresqlConfig.schema || this.dbConfig.schema,
    };
    return getTestDbConnectionString(config);
  }

  /**
   * Integresql server may be using the service name of the postgresql container to connect to database,
   * but that is not necessarily how the app connects to the database directly
   */
  getDirectConfigToDb(integresqlConfig: DbConfig) {
    return {
      ...integresqlConfig,
      host: this.dbConfig.host,
      port: this.dbConfig.port,
    };
  }

  // Default values below from docker-compose.yml that starts up integresql
  private getIntegresqlPrefix(): string {
    return process.env.INTEGRESQL_DB_PREFIX ? `${process.env.INTEGRESQL_DB_PREFIX}_` : 'covid_';
  }

  private getTemplateDbPrefix(): string {
    return process.env.INTEGRESQL_TEMPLATE_DB_PREFIX ? `${process.env.INTEGRESQL_TEMPLATE_DB_PREFIX}_` : 'template_';
  }

  getInstanceDbPrefix(): string {
    return process.env.INTEGRESQL_TEST_DB_PREFIX ? `${process.env.INTEGRESQL_TEST_DB_PREFIX}_` : 'instance_';
  }
}
