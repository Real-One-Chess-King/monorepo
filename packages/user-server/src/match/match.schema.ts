import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MatchType } from '../data/consts';
import { Turn } from '../data/types';
import { MatchResult, MatchResultReason } from './match.consts';

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {
  @Prop({ required: true })
  pkey: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  beginAt: string;

  @Prop({ required: true })
  endAt: string;

  @Prop({ required: true })
  result: MatchResult;

  @Prop({ required: true })
  resultReason: MatchResultReason;

  @Prop({ required: true })
  whitePlayer: string;

  @Prop({ required: true })
  blackPlayer: string;

  @Prop({ required: true })
  turns: Turn[];

  @Prop({ required: true })
  type: MatchType;
}
export const MatchSchema = SchemaFactory.createForClass(Match);

MatchSchema.index({ name: 1 }, { unique: true });
MatchSchema.index({ pkey: 1 }, { unique: true });
