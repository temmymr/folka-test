import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://temmy:rYRl2R2Udaj9IOa9@temmy.s5byp.mongodb.net/?retryWrites=true&w=majority&appName=temmy"),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
