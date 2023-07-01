
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { MediaType } from '../../../../../api_gateway/src/media/enums/media_type.enum';
import { PlatformMedia } from '../../../../../api_gateway/src/media/enums/platform.enum';
import { UploaderDocument } from 'src/uploader/schemas/uploader.schema';
import { ShareType } from '../../../../../api_gateway/src/media/enums/share_type.enum';


@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false,
})
export class MediaDocument extends Document {

  @Prop({ default: PlatformMedia.Other })
  platform: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: UploaderDocument.name })
  uploader: Types.ObjectId;

  @Prop({ default: MediaType.Image })
  type: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  paths: string[];

  @Prop({enum: ShareType, default: ShareType.None })
  isShared: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: UploaderDocument.name })
  sharedTo: UploaderDocument[];
  
  // @Prop({ type: [SchemaTypes.ObjectId], ref: Album.name })
  // permissions: Permission[];

}

export const MediaDocumentSchema = SchemaFactory.createForClass(MediaDocument);
