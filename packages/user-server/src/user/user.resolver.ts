import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.gql-model';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user.create-dto';
import { CreateUserInput } from './input/create-user.input';
import { plainToClass } from 'class-transformer';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userRepository: UserRepository,
    // private postsService: PostsService,
  ) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.userRepository.findOneById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const createUserDto = plainToClass(CreateUserDto, createUserInput);

    return this.userRepository.create(createUserDto);
  }
}
