import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/dev (GET)', () => {
    return request(app.getHttpServer()).get('/dev').expect(200).expect('Hello World!');
  });

  it('/dev/ping-database', () => {
    return request(app.getHttpServer())
      .get('/dev/ping-database')
      .expect(200)
      .expect([{ database: 'up' }]);
  });
});
