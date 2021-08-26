import { Test, TestingModule } from '@nestjs/testing';
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

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll(); // 자동으로 생성된 MovieService의 getAll() function test
      expect(result).toBeInstanceOf(Array); // toBeInstanceOf() 사용하여 리턴타입을 체크한다
    });
  });


});
