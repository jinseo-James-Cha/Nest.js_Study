import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it : Individual Test
  it("should be 4", () =>{
    expect(2+2).toEqual(4); // pass
    // expect(2+2).toEqual(5); // fail
  });

  describe("getAll", () => { // getAll은 테스트의 이름으로서 반드시 function의 이름과 같지않아도 된다
    it("should return an array", () => {
      const result = service.getAll(); // 자동으로 생성된 MovieService의 getAll() function test
      expect(result).toBeInstanceOf(Array); // toBeInstanceOf() 사용하여 리턴타입을 체크한다
    });
  });

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
    });

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

  describe("create", () => {
    it("should create a movie", () => {

      const beforeCreate = service.getAll().length;

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

  
});
