
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '../../users/schemas/users.schema';



@Schema({
  timestamps: {
    createdAt: 'createdAt',
  },
  autoIndex: true,
})
export class SessionObj extends Document {

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true, index: true })
  userID: Types.ObjectId;

  @Prop({ index: true })
  value: string;

  @Prop({ })
  currentDeviceID: string;

  @Prop({ })
  currentIpAddress: string;

  @Prop({ type: Date })
  reLoginAt: Date;

  @Prop({ type: Date })
  logoutAt: Date;

  @Prop({ type: Date, required: true })
  expiredAt: Date;

  @Prop()
  currentLocation: string[];

  @Prop({
    default: false, index: true
  })
  isExpired: boolean;

}

export const SessionSchema = SchemaFactory.createForClass(SessionObj);

SessionSchema.index(
  {
    userID: 1, isExpired: 1,
  }, {
  sparse: true
});