import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PieceId } from '../consts';
import { Rule } from '../rule/rule.schema';

export type PieceDocument = HydratedDocument<Piece>;

@Schema()
export class Piece {
  @Prop({ required: true })
  pkey: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pieceId: PieceId;

  @Prop({ required: true, default: [] })
  skillRules: Rule[];

  @Prop({ required: true, default: [] })
  movementRules: Rule[];

  @Prop({ required: true, default: [] })
  postMovementRules: Rule[];
}
export const PieceSchema = SchemaFactory.createForClass(Piece);

PieceSchema.index({ pkey: 1 }, { unique: true });
PieceSchema.index({ email: 1 }, { unique: true });
