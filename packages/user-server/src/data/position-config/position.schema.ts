import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Piece } from '../piece/piece.schema';

export type PositionConfigDocument = HydratedDocument<PositionConfig>;

@Schema()
export class PositionConfig {
  // @Prop({ required: true })
  // pkey: string;

  @Prop({ required: true })
  piece: Piece;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}
export const PositionConfigSchema =
  SchemaFactory.createForClass(PositionConfig);
