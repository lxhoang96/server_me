import { Injectable } from '@nestjs/common';
import { UploaderDocument } from './schemas/uploader.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UploaderService {
  constructor(
    @InjectModel(UploaderDocument.name)
    private uploader: Model<UploaderDocument>,) { }
  
  async create(userID: string): Promise<string> {
    const current_uploader = await this.uploader.findOne({ userID: userID }).exec();
    if (current_uploader) {
      return current_uploader._id;
    }
    const new_uploader = new this.uploader({ userID : userID});
    await new_uploader.save();
    return new_uploader._id;
  }

  async findAll() {
    return await this.uploader.find();
  }

  async findOne(id: string) {
    return await this.uploader.findById(id);
  }


  remove(id: number) {
    return `This action removes a #${id} uploader`;
  }
}
