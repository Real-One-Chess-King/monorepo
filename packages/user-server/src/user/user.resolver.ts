import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserGql } from './user.gql-model';
import { UserRepository } from './user.repository';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './input/update-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { CurrentUser } from './user.decorators';
import { JwtPayload } from '../auth/jwt.payload';
import { StatisticsGql } from '../statistics/statistics.gql-model';
import { UserDocument } from './user.schema';
import { MatchGql } from '../match/match.gql-model';

@Resolver(() => UserGql)
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @Mutation(() => UserGql, { name: 'updateUser' })
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<UserGql> {
    const email = currentUser.email;
    const updateUserDto = plainToClass(UpdateUserDto, updateUserInput);

    const user = await this.userRepository.updateByEmail(email, updateUserDto);
    return { pkey: user.pkey, ...user };
  }

  @Query(() => UserGql)
  async user(@Args('pkey', { type: () => String }) pkey: string) {
    return this.userRepository.findOneById(pkey);
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

  // @ResolveField()
  // async posts(@Statistics() user: Statistics) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }

  // @Mutation(() => User, { name: 'signIn' })
  // async signIn(
  //   @Args('signInInput') createUserInput: CreateUserInput,
  // ): Promise<User> {
  //   const createUserDto = plainToClass(CreateUserDto, createUserInput);

  //   const user = await this.userRepository.create(createUserDto);
  //   const { accessToken } = await this.authService.generateJwt(createUserDto);
  //   return { accessToken, ...user };
  // }
}
