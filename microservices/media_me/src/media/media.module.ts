import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaDocument, MediaDocumentSchema } from './schemas/media.schema';
import { UploaderModule } from 'src/uploader/uploader.module';

@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: MediaDocument.name, schema: MediaDocumentSchema, collection: 'media', }]),
    UploaderModule,
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
  
export class MediaModule {}
