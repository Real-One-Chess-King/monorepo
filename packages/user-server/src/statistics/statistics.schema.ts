import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Statistics {
  @Prop({ required: true })
  pkey: string;

  @Prop({ default: 0 })
  gamesPlayed: number;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  losses: number;

  @Prop({ default: 0 })
  stalemates: number;

  @Prop({ default: 0 })
  lostPieces: number;
}
