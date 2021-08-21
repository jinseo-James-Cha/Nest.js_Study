import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

// decorator - 클래스에 함수 기능을 추가
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [],
})
export class AppModule {}
