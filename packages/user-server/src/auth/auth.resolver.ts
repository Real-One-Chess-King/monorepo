import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserGql } from '../user/user.gql-model';
import { plainToClass } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { SignInInput } from './input/sign-in.input';
import { SignInDto } from './dto/sign-in.dto';
import { TokenDto } from './dto/token.dto';
import { Token } from './auth.schema';

@Resolver(() => UserGql)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Token, { name: 'signUp' })
  async signUp(
    @Args('signUpInput') signInInput: SignInInput,
  ): Promise<TokenDto> {
    const signUpDto = plainToClass(SignInDto, signInInput);
    return this.authService.signUp(signUpDto);
  }

  @Mutation(() => Token, { name: 'signIn' })
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<TokenDto> {
    const signInDto = plainToClass(SignInDto, signInInput);

    return this.authService.singIn(signInDto);
  }
}
