import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// 2021-08-28 e2e test started
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();


    // 실제 어플리케이션과 다른 테스트용 어플리케이션을 생성하여
    // 테스트를 진행하기 때문에 설정값(ex. pipe)을 같이 설정해주어야한다. 
    app = moduleFixture.createNestApplication();

    // main.ts에서 가져온 어플리케이션 설정값
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,     
    }));

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
    it('POST 201', () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: 'TEST',
        year: 2000,
        genres: ['test']
      })
      .expect(201);
    });

    // create()
    it('POST 400', () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title: 'TEST',
        year: 2000,
        genres: ['test'],
        other: "error occurred"
      })
      .expect(400);
    });

    // delete
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    });

  });

  describe('/movies/:id', ()=>{
    // getOne, success
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get('/movies/1') // 여기서 보내는 1은 number type이 아닌 string으로 넘어간다
      .expect(200);
    });

    // getOne, failed
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/1231421') // 
      .expect(404);
    });

    // update, success
    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title:'updated test'
      })
      .expect(200);
    });

    // update, fail
    it('PATCH 400', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        other: 'updated fail string' // dto에 있는 property가 아니기에 400에러
      })
      .expect(400);
    });

    // remove
    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer())
      .delete('/movies/91231') // id값을 찾기 못하기에 404에러
      .expect(404);
    });

  });
});
