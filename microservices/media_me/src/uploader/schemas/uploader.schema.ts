
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { GroupDocument } from 'src/group/schemas/group.schema';
import { AlbumDocument } from 'src/album/schemas/album.schema';
import { MediaDocument } from 'src/media/schemas/media.schema';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class UploaderDocument extends Document {

  @Prop({unique: true})
  userID: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'User' })
  friends: [];

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'GroupDocument' })
  groups: GroupDocument[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'AlbumDocument' })
  albums: AlbumDocument[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'MediaDocument' })
  medias: MediaDocument[];
}

export const UploaderDocumentSchema = SchemaFactory.createForClass(UploaderDocument);
