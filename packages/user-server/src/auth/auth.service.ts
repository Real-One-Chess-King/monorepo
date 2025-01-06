// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(payload: JwtPayload): Promise<{ accessToken: string }> {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
