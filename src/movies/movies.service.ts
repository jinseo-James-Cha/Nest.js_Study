import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

    private movies: Movie[] = []; // 변수선언 순서
                                  // 접근제한자 변수명 : 변수 타입 = 값초기화;

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:string): Movie{
        return this.movies.find(movie => movie.id == parseInt(id)); // string id의 int형변환 1
        // this.movies.find(movie => movie.id == +id); // string id의 int형변환 2
    }
}
