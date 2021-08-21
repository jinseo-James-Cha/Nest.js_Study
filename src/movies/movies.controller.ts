import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies') // entry point
export class MoviesController {

    @Get()
    getAll(){
        return 'this will return all movies';
    }

    @Get("/:id") // :id -> Spring의 PathVariable과 같다.
    getOne(@Param('id') movieId: string){
        return `this will return one movie with the id  : ${movieId}`;
    }

    @Post()
    create(){
        return 'This will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') movieId: string){
        return `This will delete a movie with the id :  ${movieId}`;
    }

    @Patch('/:id')
    ptch(@Param('id') movieId: string){
        return `This will update a movie with the id : ${movieId}`;
    }
}
