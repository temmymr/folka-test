import { NestFactory } from '@nestjs/core';
import { TemmyApiGatewayModule } from './temmy-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(TemmyApiGatewayModule);
  await app.listen(3000);
}
bootstrap();
