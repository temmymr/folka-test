import { Controller, Post, Get, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenGuard } from './token.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('generate')
  generateToken() {
    return this.tokenService.generateToken();
  }

  @Get('protected')
  @UseGuards(TokenGuard)
  protectedRoute() {
    return { message: 'Access granted' };
  }
}
