import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumDocument, AlbumDocumentSchema } from './schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AlbumDocument.name, schema: AlbumDocumentSchema, collection: 'album', }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
