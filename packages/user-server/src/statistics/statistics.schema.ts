import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Statistics {
  @Prop({ default: 0 })
  gamesPlayed: number;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  losses: number;

  @Prop({ default: 0 })
  lostPieces: number;
}
