import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.gql-model';
import { UserRepository } from './user.repository';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './input/update-user.input';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { CurrentUser } from './user.decorators';
import { JwtPayload } from '../auth/jwt.payload';

@Resolver(() => User)
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.userRepository.findOneById(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<User> {
    const email = currentUser.email;
    const updateUserDto = plainToClass(UpdateUserDto, updateUserInput);

    const user = await this.userRepository.updateByEmail(email, updateUserDto);
    return { id: user.id, ...user };
  }

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
