/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDateString } from 'class-validator';
import { MatchResult, MatchResultReason } from '../match.consts';
import { MatchType } from '../../data/consts';
import { User } from 'src/user/user.schema';

@InputType()
export class CreateMatchInput {
  @Field({ nullable: false })
  @IsString()
  name: string;

  @Field({ nullable: false })
  @IsDateString()
  beginAt: string;

  @Field({ nullable: false })
  @IsDateString()
  endAt: string;

  @Field((type) => MatchResult, { nullable: false })
  result: MatchResult;

  @Field((type) => MatchResultReason, { nullable: false })
  resultReason: MatchResultReason;

  @Field((type) => MatchType, { nullable: false })
  matchType: MatchType;

  @Field(() => User, { nullable: false })
  whitePlayer: string; //TDOO

  @Field(() => User, { nullable: false })
  blackPlayer: User; //TDOO

  @Field(() => [String])
  turns: any[]; // TODO
}
