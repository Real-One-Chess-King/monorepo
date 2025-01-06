import {
  Args,
  ID,
  // Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.gql-model';
import { UserRepository } from './user.repository';
// import { CreateUserDto } from './dto/user.create-dto';
// import { CreateUserInput } from './input/create-user.input';
// import { plainToClass } from 'class-transformer';

@Resolver(() => User)
export class UserResolver {
  constructor(private userRepository: UserRepository) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.userRepository.findOneById(id);
  }

  // @Mutation(() => User, { name: 'signUp' })
  // async signUp(
  //   @Args('createUserInput') createUserInput: CreateUserInput,
  // ): Promise<User & { accessToken: string }> {
  //   const createUserDto = plainToClass(CreateUserDto, createUserInput);

  //   const user = await this.userRepository.create(createUserDto);
  //   const { accessToken } = await this.authService.generateJwt(createUserDto);
  //   return { accessToken, ...user };
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
