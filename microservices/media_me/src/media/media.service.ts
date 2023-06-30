import { Injectable } from '@nestjs/common';
import { MediaDocument } from './schemas/media.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploaderService } from 'src/uploader/uploader.service';
import { CreateMediaInterface } from '../../../../common/interfaces/create-media.interface';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(MediaDocument.name)
    private mediaDocument: Model<MediaDocument>,
    private uploaderService: UploaderService,
  ) { }
  async create(createMediaInterface: CreateMediaInterface, paths: string[]) {
    console.log(createMediaInterface.uploader)
    try {
      let docs = new this.mediaDocument(createMediaInterface);
      docs.paths = paths;
    
      const savedDoc = await docs.save();
      let uploader = await this.uploaderService.findOne(createMediaInterface.uploader);
      uploader.medias.push(savedDoc._id);
      await uploader.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  async findAll() {
    return await this.mediaDocument.find();
  }

  async findOne(id: string) {
    return await this.mediaDocument.findById(id);
  }

  async remove(id: string) {
    return await this.mediaDocument.findByIdAndDelete(id);
  }

}
