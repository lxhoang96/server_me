import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { MediaDocument } from "src/media/schemas/media.schema";
import { UploaderDocument } from "src/uploader/schemas/uploader.schema";

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class AlbumDocument extends Document {

  @Prop({ unique: true })
  name: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: UploaderDocument.name })
  createdBy: Types.ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: MediaDocument.name })
  media: MediaDocument[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: AlbumDocument.name })
  subGroup: AlbumDocument[];

}

export const AlbumDocumentSchema = SchemaFactory.createForClass(AlbumDocument);