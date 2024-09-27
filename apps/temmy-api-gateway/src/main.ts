import { NestFactory } from '@nestjs/core';
import { TemmyApiGatewayModule } from './temmy-api-gateway.module';
import * as dotenv from 'dotenv'

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(TemmyApiGatewayModule);
  await app.listen(3000);
}
bootstrap();
