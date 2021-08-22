import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// decorator - 클래스에 함수 기능을 추가
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})

export class AppModule {}
