import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";

// 가능하나 더 간단하게 구현가능하다
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