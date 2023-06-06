import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { UploaderDocument } from "src/uploader/schemas/uploader.schema";

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class GroupDocument extends Document {

  @Prop({ unique: true })
  name: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: UploaderDocument.name })
  createdBy: Types.ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: UploaderDocument.name })
  admin: Types.ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: UploaderDocument.name })
  users: UploaderDocument[];

}

export const GroupDocumentSchema = SchemaFactory.createForClass(GroupDocument);