import { Test, TestingModule } from '@nestjs/testing';
import { TemmyApiGatewayController } from './temmy-api-gateway.controller';
import { TemmyApiGatewayService } from './temmy-api-gateway.service';

describe('TemmyApiGatewayController', () => {
  let temmyApiGatewayController: TemmyApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TemmyApiGatewayController],
      providers: [TemmyApiGatewayService],
    }).compile();

    temmyApiGatewayController = app.get<TemmyApiGatewayController>(TemmyApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(temmyApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
