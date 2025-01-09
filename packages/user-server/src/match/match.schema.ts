import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {
  @Prop({ required: true })
  pkey: string;

  @Prop({ required: false })
  name: string;
}
export const MatchSchema = SchemaFactory.createForClass(Match);

MatchSchema.index({ name: 1 }, { unique: true });
MatchSchema.index({ id: 1 }, { unique: true });
