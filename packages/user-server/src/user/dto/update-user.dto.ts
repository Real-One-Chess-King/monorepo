import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  nickname: string;

  firstName?: string;

  lastName?: string;
}
