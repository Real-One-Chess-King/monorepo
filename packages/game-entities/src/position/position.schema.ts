import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { MatchType } from '../consts';
import { Color } from '@real_one_chess_king/game-logic';
import { PositionConfig } from '../position-config/position.schema';

export type PositionDocument = HydratedDocument<Position>;

@Schema()
export class Position {
  @Prop({ required: true })
  pkey: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: Color;

  @Prop({ required: true })
  matchType: MatchType;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: true,
  })
  playerId?: Types.ObjectId; // for user custom positions

  @Prop({ type: PositionConfig })
  config: PositionConfig[];
}
export const PositionSchema = SchemaFactory.createForClass(Position);

PositionSchema.index({ pkey: 1 }, { unique: true });
PositionSchema.index({ email: 1 }, { unique: true });
