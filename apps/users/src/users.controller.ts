import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('users.findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('users.findById')
  findById(@Payload() id: string) {
    return this.usersService.findById(id);
  }

  @MessagePattern('users.findByIdentityNumber')
  findByIdentityNumber(@Payload() id: number) {
    return this.usersService.findByIdentityNumber(id);
  }

  @MessagePattern('users.findByAccountNumber')
  findByAccountNumber(@Payload() id: number) {
    return this.usersService.findByAccountNumber(id);
  }

  @MessagePattern('users.update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('users.remove')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
