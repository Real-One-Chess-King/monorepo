import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Match } from './match.schema';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchRepository {
  constructor(@InjectModel(Match.name) private matchModel: Model<Match>) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel({
      pkey: randomUUID(),
      ...createMatchDto,
    });

    try {
      return await createdMatch.save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create match');
    }
  }

  async findByPkey(pkey: string): Promise<Match | undefined> {
    return this.matchModel.findOne({ pkey }).exec();
  }
  async findAll(): Promise<Match[]> {
    return this.matchModel.find().exec();
  }

  async updateByPkey(
    pkey: string,
    updateMatchDto: Partial<CreateMatchDto>,
  ): Promise<Match> {
    const updatedMatch = await this.matchModel
      .findOneAndUpdate({ pkey }, updateMatchDto, { new: true })
      .exec();

    if (!updatedMatch) {
      throw new NotFoundException('Match not found');
    }

    return updatedMatch;
  }
  async deleteByPkey(pkey: string): Promise<void> {
    const result = await this.matchModel.deleteOne({ pkey }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Match not found');
    }
  }
}
