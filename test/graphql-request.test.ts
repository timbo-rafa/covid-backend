import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export function graphqlRequest<T>(app: INestApplication, query: string, input?: T) {
  const variables = input ? { input } : undefined;

  return request(app.getHttpServer()).post('/graphql').send({ query, variables });
}
