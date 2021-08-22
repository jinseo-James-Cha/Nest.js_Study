# James learning Nest.js

## 개념 스터디
 - nest.js는 controller - url mapping/ service - business logic 
 - @ decorator  -> 클래스에 함수 기능을 추가
 - app.module -> 모든 모듈의 Root 역할
 - module -> 어플리케이션의 일부분
 - JSON return을 위한 설정이 자동으로 되어있다 -> COOOOOOLLLLLLLLL!!

 ```
 @Module({
  imports: [],
  controllers: [AppController], // url을 가져오고 함수를 실행한다. express의 router역할, Spring의 @controller와 유사
  providers: [AppService], // controller에서의 함수 요청을 응답하며, 비지니스 로직 처리를 한다
})
 ```
 ```
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
 ```

## 명령어 스터디
 - npm run start:dev -> localhost:3000
 - nest -> 사용할 수 있는 명령어 내역
 - nest g co -> controller 자동 생성, 자동 추가
 - nest g s -> service 자동 생성, 자동 추가



---------------------
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
