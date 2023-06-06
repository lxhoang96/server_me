import { Injectable } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { UploaderDocument } from './schemas/uploader.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UploaderService {
  constructor(
    @InjectModel(UploaderDocument.name)
    private uploader: Model<UploaderDocument>,) { }
  
  async create(createUploaderDto: CreateUploaderDto) {
    const new_uploader = new this.uploader(createUploaderDto);
    await new_uploader.save();
  }

  async findAll() {
    return await this.uploader.find();
  }

  async findOne(id: string) {
    return await this.uploader.findById(id);
  }

  update(id: number, updateUploaderDto: UpdateUploaderDto) {
    return `This action updates a #${id} uploader`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploader`;
  }
}
