import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

@Controller('movies') // entry point
export class MoviesController {

    @Get()
    getAll(){
        return 'this will return all movies';
    }

    @Get('search') // http://localhost:3000/movies/search?year=2003
    search(@Query('year') searchingYear: string){ // query string의 name값
        return `We are search for a movie made after : ${searchingYear}`;
    }

    @Get(':id') // :id -> Spring의 PathVariable과 같다. http://localhost:3000/movies/1
    getOne(@Param('id') movieId: string){  // url로 부터 들어온 parameter를 읽어오는 decorator : @Param('/:parametername')
        return `this will return one movie with the id  : ${movieId}`; // ''이나 ""가 아닌 `${movieId}`가 사용되였다. 
    }

    @Post()
    create(@Body() movieData: string){
        console.log(movieData);
        return 'This will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') movieId: string){
        return `This will delete a movie with the id :  ${movieId}`;
    }

    @Patch('/:id')
    ptch(@Param('id') movieId: string, @Body() updateData){ // body로 부터 들어온 json을 읽어오는 decorator : @Body
        return { // return문을 JSON으로 만들어서 응답한다.
            updatedMovie : movieId,
            ...updateData, // ...의 의미는 이미updateDate는 JSON포멧이라서?
        };
    }

    


}