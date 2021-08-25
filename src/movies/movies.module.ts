import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers:[MoviesController],
    providers:[MoviesService] // Dependency Injection
})
export class MoviesModule {

    con

}

