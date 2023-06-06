
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class User extends Document {

  @Prop({ unique: true, sparse: true })
  discordId: string;

  @Prop({ unique: true, sparse: true })
  telegramId: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  phoneNumber: string;

  @Prop()
  discordName: string;

  @Prop({required: true})
  password: string;

  @Prop()
  telegramName: string;

  @Prop()
  nickname: string;

  @Prop()
  privateKey: string;

  @Prop()
  publicKey: string;

}

export const UsersSchema = SchemaFactory.createForClass(User);