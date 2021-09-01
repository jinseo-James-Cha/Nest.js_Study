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
      whitelist: true, // 반드시 들어가야 할 프로펄티를 400에러와 메세지에 출력
      forbidNonWhitelisted: true, // 들어가지 말아야 할 프로퍼티가 들어갔을 시 400에러와 메세지 출력
      transform: true, // 원하는 실제 타입으로 변환 querystring의 value값은 string이였으나 
                       //controller에서는 number로 변환해준다
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

    // update
    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title:'updated test'
      })
      .expect(200);
    });

    // remove
    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  });
});
