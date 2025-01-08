import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  email: string;

  // @Field({ nullable: true })
  // password: string;

  // @Field({ nullable: true })
  // salt: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Int, { nullable: false })
  mmr: number;
}
