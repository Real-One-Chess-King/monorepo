import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // Typically Mongoose sets its own _id field of type ObjectId automatically,
  // so you don't need to define `id` or `_id` unless you have a special use case.

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  nickname: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ required: true })
  mmr: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
