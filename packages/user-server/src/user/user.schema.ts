import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Statistics } from '../statistics/statistics.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  pkey: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  nickName?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ required: true })
  mmr: number;

  @Prop({ type: Statistics, default: () => ({}) })
  statistics: Statistics;

  @Prop({ type: [String], default: [] })
  matchesHistory: string[]; // Array of Match UUIDs
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ pkey: 1 }, { unique: true });
