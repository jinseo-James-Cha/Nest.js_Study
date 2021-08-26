# Typescript learning before Nest.js

 - 자바스크립트와 타입스크립트 간단 비교 코드
 ```
// javascript code
function add(a, b){
 return a + b;
}

console.log(add('3', '5')); // 35출력, 에러 없음


// typescript code
function add(a: number, b: number){ // 변수의 타입 지정
 return a + b;
}

//console.log(add('3', '5')); // complie error, number type의 매개변수이기 떄문에
console.log(add(3, 5));
 ```
 
 ### 특징
  - 객체지향적
  - 컴파일 타임 오류
  - 컴파일( ts -> js -> 실행)
  - 타입 추론(type Inference) : 처음 할당된 초기값의 타입에 따라 해당 변수의 타입이 결정되어 다른 타입으로의 값 초기화는 불가하다.
  - 타이 명시(type annotations) : 변수르 선언할 시, 변수값의 타입을 명시함으로써 변수의 데이터 타입을 지정할 수 있다.
  - ? : interface내 정의된 프로퍼티이름 '뒤'  ?(Optional)를 붙이면 선택적 프로퍼티로 된다 -> age?: number;
  - readonly : interface내 정의된 프로퍼티이름 "앞" readonly를 붙이면 객체 생성시 할당되 데이터 값을 바꿀 수 없다
  - 메소드 호출 두가지 방식 : 1) add(num: number): number; 
                         2) add: (num: number) => number;

  - 열거형(Enum) : 열거형으로 데이터 타입을 생성한다.
  ```
  // 숫자형 enum
  enum GenderType{
   Male, // 0, GenderType.Male 사용가능
   Female, // 1
   GenderNeutral // 2
  }
  
  // 문자형 enum
  enum GenderType{
   Male = 'male', // male, GenderType.Male 사용가능
   Female = 'female', // female
   GenderNeutral = 'genderNeutral' // genderNeutral  
  }
  ```
 - 리터럴 타입 : enum과 같은 기능으 하지만 가독성을 높일 수 있다.
 ```
 interface Student{
  Gender: 'male' | 'female' | 'genderNeutral'
 }
 ```



 ### ts 환경설정
  - extention intallation : prettier, path intellisense, material icon theme, ESlint, bracket color colorize2
  - 

# James learning Nest.js

## 개념 스터디
 - nest.js는 controller - url mapping/ service - business logic 
 - @ decorator  -> 클래스에 함수 기능을 추가
 - app.module -> 모든 모듈의 Root 역할
 - module -> 어플리케이션의 일부분
 - JSON return을 위한 설정이 자동으로 되어있다 -> COOOOOOLLLLLLLLL!!
 - Nest.js는 express, fastify(성능2배) 위에서 작동 할 수 있다

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
 - nest g mo -> module 생성
 - npm i class-validator class-transformer -> main.ts에  app.useGlobalPipes(new ValidationPipe()); 추가하기 위함
 ```
 // 전송받은 값을 pipe를 이용하여 validation을 할 수 있다
 1. main.ts -> app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 반드시 들어가야 할 프로펄티를 400에러와 메세지에 출력
    forbidNonWhitelisted: true, // 들어가지 말아야 할 프로퍼티가 들어갔을 시 400에러와 메세지 출력
    transform: true, // 원하는 실제 타입으로 변환 querystring의 value값은 string이였으나 
                     //controller에서는 number로 변환해준다
  }));

 2. dto -> 필드위에 @IsString(), @IsNumber(), @IsString({each: true})를 추가하여 무엇으로 validate할지 기준을 정한다.

 3. validation 실패 시
 statusCode 400과 함께 에러 발생
 ```
- npm i @nestjs/mapped-types -> updateDTO에서 ?사용대신 간단하게 구현가능하다.
```
// 부분타입(partial types)를 미사용
// export class UpdateMovieDto{
    
//     @IsString()    
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;
    
//     @IsString({each: true})
//     readonly genres?: string[];
// }

// 부분타입(partial types)를 사용
// CreateMovieDto의 프로펄티들을 위와같이 ?을 붙여준다
export class UpdateMovieDto extends PartialType(CreateMovieDto){}
```

## TEST
- npm run test:cov -> .spec.ts파일을 모두 찾아서 몇번째 라인, 얼마나 많은 라인이 테스트 되었는지 %로 보여준다 
- npm run test:watch -> a -> .spec.ts파일을 모두 찾고, 패스 상황을 알려준다, 실시간 테스트 가능

### Unit Test : function 하나만 테스트를 하고자 할 때 사용
 - npm run test:watch -> a -> 실행하여 테스트를 작성할 시 자동으로 테스트까지 완료하는것을 확인
 - simple test
 ```
 // it : Individual Test
  it("should be 4", () =>{
    expect(2+2).toEqual(4); // pass
    expect(2+2).toEqual(5); // fail
  });
 ```
 - create test
 ```
 describe("create", () => {
    it("should create a movie", () => {

      const beforeCreate = service.getAll().length;
      console.log(beforeCreate);

      service.create({  
        title:"test Movie",
        genres:['test'],
        year: 2000,
      });

      const afterCreate = service.getAll().length;
      console.log(afterCreate);

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
 ```
 - getAll test
 ```
  describe("getAll", () => { // getAll은 테스트의 이름으로서 반드시 function의 이름과 같지않아도 된다
    it("should return an array", () => {
      const result = service.getAll(); // 자동으로 생성된 MovieService의 getAll() function test
      expect(result).toBeInstanceOf(Array); // toBeInstanceOf() 사용하여 리턴타입을 체크한다
    });
  });
  ```
  
  - getOne test
  ```
  describe("getOne", () => {
    // 검색조회를 위한 데이터를 삽입하여 테스트를 진행하여야 한다.
    it("should return a movie", () =>{
      service.create({  
        title:"test Movie",
        genres:['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // movie에 undefined인지 체크
      expect(movie.id).toEqual(1); // movie의 id가 1인지 체크
    })

    // 검색조회 실패를 위한 테스트
    it("should throw 404 error", ()=>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException); // 검색에 실패했을 시 서비스에서 발생시킬 에러
        expect(e.message).toEqual('movie with id 999 not found'); // 검색 실패시, 생성한 에러메세지 체크
      }
    });
  });
 ```
 - deleteOne test
 ```
 describe("deleteOne", () =>{
    it("should delete a movie", () => {
      service.create({  
        title:"test Movie",
        genres:['test'],
        year: 2000,
      });

      // console.log(service.getOne(1));
      const allMovies = service.getAll().length; // 지우기 전 전체 목록
      service.deleteOne(1); // id가 1인 데이터 열 삭제
      const afterDeleteOne = service.getAll().length; // 지후고 난 후 데이터 전체 목록

      expect(afterDeleteOne).toBeLessThan(allMovies); // deleteOne메소드 전 후로 전체 목록의 길이를 비교
    });

    it("should return a 404", () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
 ```
 - update test
 ```
 describe("update", () => {
    it("should update a movie", () => {
      service.create({  
        title:"test Movie",
        genres:['test'],
        year: 2000,
      });

      console.log(service.getOne(1));
    
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      console.log(service.getOne(1));

      expect(movie.title).toEqual('Updated Test');
    });

    it("should return a NotFoundException", () => {
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
 ```
### e2e Test : 페이지로 가면 특정페이지가 나와야 하는 것을 테스트, 유저관점에서 테스트하는것을 말함

## 참고 사이트
 - medium community references In Eng [1-전반적인 설명과 아키텍처](https://medium.com/geekculture/nest-js-architectural-pattern-controllers-providers-and-modules-406d9b192a3a), [2-왜 사용해야 하는가?](https://medium.com/monstar-lab-bangladesh-engineering/why-i-choose-nestjs-over-other-node-js-frameworks-6cdbd083ae67), [3-8가지 타입스크립트 예제](https://betterprogramming.pub/8-best-practices-for-future-proofing-your-typescript-code-2600fb7d8063)
 - [이동욱 개발자의 자바스크립트 기술블로그](https://jojoldu.tistory.com/category/Javascript?page=1)
 - [why NestJs?](https://selleo.com/blog/why-choose-nest-js-as-your-backend-framework)
 - what Nest.js? [장점위주의 설명](https://psyhm.tistory.com/47)  ,   [간단한 코드 예제](https://fors.tistory.com/541)
 - [closure?](https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80Closure)
 - [advantages?](https://kwony91.tistory.com/285)
 - [structures?](https://dailybook-with.tistory.com/entry/NestJS-1-%EC%95%BD%EC%86%8D%EC%9D%98-node-%EC%84%9C%EB%B2%84-%ED%94%84%EB%A0%88%EC%9E%84-%EC%9B%8C%ED%81%AC)
 - [SSR?CSR?](https://velog.io/@jeff0720/Next.js-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4-%EB%B6%80%ED%84%B0-%EC%8B%A4%EC%8A%B5%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B3%B4%EB%8A%94-SSR-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95#%EB%A7%88%EB%AC%B4%EB%A6%AC)
 
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
