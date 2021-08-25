import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';

// decorator - 클래스에 함수 기능을 추가
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})

export class AppModule {}
