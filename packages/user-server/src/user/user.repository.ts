import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, salt, nickName } = createUserDto;

    const createdUser = new this.userModel({
      pkey: randomUUID(),
      email,
      password,
      salt,
      mmr: 2000,
      nickName,
      statistics: {
        pkey: randomUUID(),
      },
      match: [],
    });

    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      console.error(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByPkey(pkey: string): Promise<User | undefined> {
    return this.userModel.findOne({ pkey }).select('-password -salt').exec();
  }

  /**
   * should be used only for login
   * because it returns user with password and salt
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateByPkey(
    pkey: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password' | 'salt' | 'match'>> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ pkey }, updateUserDto, { new: true })
      .select('firstName lastName nickName pkey')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
