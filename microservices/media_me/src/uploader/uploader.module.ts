import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UploaderDocument, UploaderDocumentSchema } from './schemas/uploader.schema';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: UploaderDocument.name, schema: UploaderDocumentSchema, collection: 'uploader', }]),
  ],
  controllers: [UploaderController],
  providers: [UploaderService],
  exports: [UploaderService]
})
export class UploaderModule {}
