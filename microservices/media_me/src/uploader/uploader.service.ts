import { Injectable } from '@nestjs/common';
import { UploaderDocument } from './schemas/uploader.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUploaderInterface } from '../../../../common/interfaces/create-uploader.interface';

@Injectable()
export class UploaderService {
  constructor(
    @InjectModel(UploaderDocument.name)
    private uploader: Model<UploaderDocument>,) { }
  
  async create(createUploaderInterface: CreateUploaderInterface) {
    const new_uploader = new this.uploader(createUploaderInterface);
    await new_uploader.save();
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
