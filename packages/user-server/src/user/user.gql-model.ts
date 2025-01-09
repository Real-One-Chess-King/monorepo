import { Field, Int, ObjectType } from '@nestjs/graphql';
import { StatisticsGql } from '../statistics/statistics.gql-model';
import { MatchGql } from '../match/match.gql-model';

@ObjectType()
export class UserGql {
  @Field(() => String, { nullable: false })
  pkey: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Int, { nullable: false })
  mmr: number;

  @Field(() => Int, { nullable: false })
  statistics?: StatisticsGql;

  @Field(() => Int, { nullable: false })
  matchesHistory?: MatchGql[];
}
