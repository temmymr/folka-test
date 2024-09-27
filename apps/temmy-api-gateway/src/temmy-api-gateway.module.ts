import { Module } from '@nestjs/common';
import { TemmyApiGatewayController } from './temmy-api-gateway.controller';
import { TemmyApiGatewayService } from './temmy-api-gateway.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TokenModule,
  ],
  controllers: [TemmyApiGatewayController],
  providers: [TemmyApiGatewayService],
})
export class TemmyApiGatewayModule {}
