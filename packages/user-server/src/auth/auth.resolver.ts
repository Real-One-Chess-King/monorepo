import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.gql-model';
import { UserRepository } from '../user/user.repository';
import { plainToClass } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { SignInInput } from './input/sign-in.input';
import { SignInDto } from './dto/sign-in.dto';
import { TokenDto } from './dto/token.dto';
import { genSalt, hash } from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { Token } from './auth.schema';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  @Mutation(() => Token, { name: 'signUp' })
  async signUp(
    @Args('signUpInput') signInInput: SignInInput,
  ): Promise<TokenDto> {
    const { email, password } = plainToClass(SignInDto, signInInput);

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    await this.userRepository.create({
      email,
      password: hashedPassword,
      salt,
    });
    const { accessToken } = await this.authService.generateJwt({ email });
    return { accessToken };
  }

  @Mutation(() => Token, { name: 'signIn' })
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<TokenDto> {
    const signInDto = plainToClass(SignInDto, signInInput);

    const user = await this.userRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await hash(signInDto.password, user.salt);
    if (hashedPassword !== user.password) {
      throw new NotFoundException('User not found');
    }

    const { accessToken } = await this.authService.generateJwt({
      email: user.email,
    });
    return { accessToken };
  }
}
