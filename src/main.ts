import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 반드시 들어가야 할 프로펄티를 400에러와 메세지에 출력
    forbidNonWhitelisted: true, // 들어가지 말아야 할 프로퍼티가 들어갔을 시 400에러와 메세지 출력
    transform: true, // 원하는 실제 타입으로 변환 querystring의 value값은 string이였으나 
                     //controller에서는 number로 변환해준다
  }));

  await app.listen(3000);
}
bootstrap();
