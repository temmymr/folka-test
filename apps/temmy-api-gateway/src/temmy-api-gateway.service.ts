import { Injectable } from '@nestjs/common';

@Injectable()
export class TemmyApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
