import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World and James ';
  }

  getHi(): string{
    return 'say hi';
  }
}
