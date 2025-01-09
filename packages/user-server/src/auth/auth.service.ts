import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { hash, genSalt } from 'bcryptjs';
import { UserRepository } from '../user/user.repository';
import { SignInDto } from './dto/sign-in.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  // resolvers methods

  async signUp(signUpDto: SignInDto): Promise<TokenDto> {
    const { email, password } = signUpDto;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const { pkey } = await this.userRepository.create({
      email,
      password: hashedPassword,
      salt,
    });
    const { accessToken } = await this.generateJwt({ email, pkey });
    return {
      accessToken,
      pkey,
    };
  }

  async singIn(signInDto: SignInDto): Promise<TokenDto> {
    const user = await this.userRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await hash(signInDto.password, user.salt);
    if (hashedPassword !== user.password) {
      throw new NotFoundException('User not found');
    }

    const { accessToken } = await this.generateJwt({
      email: user.email,
      pkey: user.pkey,
    });
    return { accessToken, pkey: user.pkey };
  }

  // utils

  async generateJwt(payload: JwtPayload): Promise<{ accessToken: string }> {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async parseJwt(accessToken: string): Promise<JwtPayload> {
    return this.jwtService.decode(accessToken);
  }
}
