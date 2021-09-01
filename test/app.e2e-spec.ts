import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// 2021-08-28 e2e test started
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to My movie API');
  });

  describe('/movies', () => {
    // getAll()
    it("/movies (GET)", () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);
    });

    // create()
    it('POST', () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: 'TEST',
        year: 2000,
        genres: ['test']
      })
      .expect(201);
    });
  });
});
