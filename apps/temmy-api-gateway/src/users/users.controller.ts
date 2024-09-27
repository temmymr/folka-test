import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenGuard } from '../token/token.guard';

@Controller('users')
@UseGuards(TokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('accountNumber/:accountNumber')
  findByAccountNumber(@Param('accountNumber') accountNumber: string) {
    return this.usersService.findByAccountNumber(+accountNumber);
  }

  @Get('identityNumber/:identityNumber')
  findByIdentityNumber(@Param('identityNumber') identityNumber: string) {
    return this.usersService.findByAccountNumber(+identityNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
