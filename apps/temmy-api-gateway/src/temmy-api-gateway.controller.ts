import { Controller, Get } from '@nestjs/common';
import { TemmyApiGatewayService } from './temmy-api-gateway.service';

@Controller()
export class TemmyApiGatewayController {
  constructor(private readonly temmyApiGatewayService: TemmyApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.temmyApiGatewayService.getHello();
  }
}
