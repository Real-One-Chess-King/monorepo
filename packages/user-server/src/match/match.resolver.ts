import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MatchGql } from './match.gql-model';
import { MatchRepository } from './match.repository';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CreateMatchInput } from './input/create-match.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => MatchGql)
export class MatchResolver {
  constructor(private matchRepository: MatchRepository) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MatchGql, { name: 'createMatch' })
  async createMatch(
    @Args('createMatchInput') createMatchInput: CreateMatchInput,
  ): Promise<MatchGql> {
    const newMatch = await this.matchRepository.create(createMatchInput);
    return newMatch;
  }

  @Query(() => MatchGql, { name: 'getMatch' })
  async getMatch(
    @Args('pkey', { type: () => String }) pkey: string,
  ): Promise<MatchGql> {
    const match = await this.matchRepository.findByPkey(pkey);
    if (!match) {
      throw new NotFoundException(`Match not found`);
    }
    return match;
  }
}
