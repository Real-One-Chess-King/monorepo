import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MatchType, RuleType } from '../consts';

export type RuleDocument = HydratedDocument<Rule>;

@Schema()
export class Rule {
  @Prop({ required: true })
  pkey: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  matchType: MatchType;

  @Prop({ required: true })
  ruleType: RuleType;

  @Prop({ required: true })
  config: any;
}
export const RuieSchema = SchemaFactory.createForClass(Rule);

RuieSchema.index({ pkey: 1 }, { unique: true });
RuieSchema.index({ email: 1 }, { unique: true });
