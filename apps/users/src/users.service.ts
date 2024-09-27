import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto)
      await newUser.save();
      return newUser;
    } catch (err) {
      if (err.code === 11000) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'user is already exist',
        }
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server error',
      }
    }
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findById(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'id is invalid',
      }
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      }
    }

    return user;
  }

  async findByAccountNumber(accountNumber: number) {
    const user = await this.userModel.findOne({
      accountNumber: accountNumber
    });
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      }
    }

    return user;
  }

  async findByIdentityNumber(identityNumber: number) {
    const user = await this.userModel.findOne({
      identityNumber: identityNumber
    });
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      }
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid user id',
      }
    }

    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        }
      }
      return user;
    } catch (err) {
      if (err.code === 11000) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User already exist',
        }
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Server error',
      }
    }
  }

  async remove(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid user id',
      }
    }
    const user = await this.userModel.findByIdAndDelete(id)

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      }
    }

    return user;
  }
}

