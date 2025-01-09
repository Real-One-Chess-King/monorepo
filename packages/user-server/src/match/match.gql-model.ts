import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class MatchGql {
  @Field(() => ID, { nullable: false })
  pkey: string;
}
