import { DbConfig } from '../test-database.config';

type BaseIntegresqlResponse = {
  database: {
    templateHash: string;
    config: DbConfig;
  };
  message?: 'template is already initialized' | 'template not found' | string;
};

export type InitializeTemplateResponse = BaseIntegresqlResponse;

export type GetDatabaseResponse = BaseIntegresqlResponse & {
  id: number;
};
