import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MatchGql {
  @Field(() => String, { nullable: false })
  pkey: string;

  @Field({ nullable: false })
  name: string;
}
