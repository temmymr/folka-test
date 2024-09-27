import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private userClient: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    return this.userClient.send('users.create', createUserDto);
  }

  findAll() {
    return this.userClient.send('users.findAll', {});
  }

  findById(id: string) {
    return this.userClient.send('users.findById', id)
  }

  findByIdentityNumber(identityNumber: number) {
    return this.userClient.send('users.findByIdentityNumber', identityNumber)
  }

  findByAccountNumber(accountNumber: number) {
    return this.userClient.send('users.findByAccountNumber', accountNumber)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userClient.send('users.update', {id, ...updateUserDto})
  }

  remove(id: string) {
    return this.userClient.send('users.remove', id)
  }
}
