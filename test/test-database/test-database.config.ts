export type DbConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema?: string;
  alreadyExists?: boolean;
};

export function getTestDbConfig(overrides: Partial<DbConfig> = {}): DbConfig {
  const {
    host = process.env.INTEGRESQL_PGHOST || 'localhost',
    port = Number(process.env.INTEGRESQL_PGPORT) || 5432,
    username = process.env.PGUSER || 'postgres',
    password = process.env.PGPASSWORD || 'password',
    database = process.env.TEST_DB_NAME || 'test_db',
    schema = process.env.INTEGRESQL_SCHEMA || 'public',
    alreadyExists,
  } = overrides;

  const config: DbConfig = {
    host,
    port,
    username,
    password,
    database,
    schema,
  };

  if (alreadyExists !== undefined) {
    config.alreadyExists = alreadyExists;
  }

  return config;
}

export function getTestDbConnectionString(overrides: Partial<DbConfig> = {}): string {
  const config = getTestDbConfig(overrides);
  const schemaOptions = config.schema ? `?schema=${config.schema}` : '';
  return `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}${schemaOptions}`;
}
