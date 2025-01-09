import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class StatisticsGql {
  @Field(() => ID, { nullable: false })
  pkey: string;

  @Field(() => Int, { nullable: false })
  gamesPlayed: number;

  @Field(() => Int, { nullable: false })
  wins: number;

  @Field(() => Int, { nullable: false })
  losses: number;

  @Field(() => Int, { nullable: false })
  stalemates: number;

  @Field(() => Int, { nullable: false })
  lostPieces: number;
}
