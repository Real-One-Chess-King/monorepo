// packages/user-server/src/user/dto/create-user.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(6, 20)
  password: string;

  @Field()
  @IsString()
  nickname: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
