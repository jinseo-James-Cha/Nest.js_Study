import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

    private movies: Movie[] = []; // 변수선언 순서
                                  // 접근제한자 변수명 : 변수 타입 = 값초기화;

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:string): Movie{
        // return this.movies.find(movie => movie.id == parseInt(id)); // string id의 int형변환 1
        // this.movies.find(movie => movie.id == +id); // string id의 int형변환 2

        const movie = this.movies.find(movie => movie.id == +id);
        if(!movie){
            throw new NotFoundException(`movie with id ${id} not found`);
        }
        return movie;
    }

    deleteOne(id:string){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData: CreateMovieDto){
        return this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id:string, updateData){
        const movie = this.getOne(id); // 조회

        this.deleteOne(id); // 조회된 결과 삭제

        this.movies.push({...movie, ...updateData}); // 기존 데이터 + 새로운 데이터
    }
}
