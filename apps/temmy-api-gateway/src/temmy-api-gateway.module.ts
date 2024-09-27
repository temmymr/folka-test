import { Module } from '@nestjs/common';
import { TemmyApiGatewayController } from './temmy-api-gateway.controller';
import { TemmyApiGatewayService } from './temmy-api-gateway.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://temmy:rYRl2R2Udaj9IOa9@temmy.s5byp.mongodb.net/?retryWrites=true&w=majority&appName=temmy"),
    UsersModule,
    TokenModule,
  ],
  controllers: [TemmyApiGatewayController],
  providers: [TemmyApiGatewayService],
})
export class TemmyApiGatewayModule {}
