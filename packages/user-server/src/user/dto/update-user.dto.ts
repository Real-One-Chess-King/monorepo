import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  nickName: string;

  firstName?: string;

  lastName?: string;
}
