import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserGql } from './user.gql-model';
import { UserRepository } from './user.repository';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './input/update-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { CurrentUser } from './user.decorators';
import { JwtPayload } from '../auth/jwt.payload';
import { StatisticsGql } from '../statistics/statistics.gql-model';
import { UserDocument } from './user.schema';
import { MatchGql } from '../match/match.gql-model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => UserGql)
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserGql, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<UserGql> {
    const pkey = currentUser.pkey;
    const updateUserDto = plainToClass(UpdateUserDto, updateUserInput);

    return this.userRepository.updateByPkey(pkey, updateUserDto);
  }

  @Query(() => UserGql)
  async user(@Args('pkey', { type: () => String }) pkey: string) {
    const user = await this.userRepository.findByPkey(pkey);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  // @Query(() => UserGql)
  // async userByEmail(@Args('email', { type: () => String }) email: string) {
  //   return this.userRepository.findByEmail(email);
  // }

  @ResolveField(() => StatisticsGql, { name: 'statistics' })
  async resolveStatistics(
    @Parent() user: UserDocument,
  ): Promise<StatisticsGql> {
    return user.statistics;
  }

  @ResolveField(() => [MatchGql], { name: 'matchHistory' })
  async matchHistory(@Parent() user: UserDocument): Promise<MatchGql[]> {
    // user.matchHistory is an array of match UUIDs
    return []; // this.matchService.findByUUIDs(user.matchesHistory);
  }
}
