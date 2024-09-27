import { Module } from '@nestjs/common';
import { TemmyApiGatewayController } from './temmy-api-gateway.controller';
import { TemmyApiGatewayService } from './temmy-api-gateway.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    TokenModule,
  ],
  controllers: [TemmyApiGatewayController],
  providers: [TemmyApiGatewayService],
})
export class TemmyApiGatewayModule {}
