import { Injectable } from '@nestjs/common';
import { User } from './user.gql-model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/user.create-dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createCatDto,
      mmr: 0,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
