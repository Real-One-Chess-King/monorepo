// create-user.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  salt: string;

  // @IsString()
  // nickname: string;

  // @IsOptional()
  // @IsString()
  // firstName?: string;

  // @IsOptional()
  // @IsString()
  // lastName?: string;
}
