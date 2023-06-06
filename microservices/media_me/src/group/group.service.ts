import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupDocument } from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploaderDocument } from 'src/uploader/schemas/uploader.schema';
var mongoose = require('mongoose');
@Injectable()
export class GroupService {
  constructor(
    @InjectModel(GroupDocument.name)
    private groupDocument: Model<GroupDocument>,
  ) { }
  create(createGroupDto: CreateGroupDto) {
    const newGroup = new this.groupDocument(createGroupDto);
    return newGroup.save();
  }

  async findAll() {
    return await this.groupDocument.find().exec();
  }

  async findOne(id: string) {
    return await this.groupDocument.findById(id);
  }

  async updateMedia(id: string, newUsers: UploaderDocument[]) {
    let group = await this.groupDocument.findById(id);
    group.users = newUsers;
    return group.save();
  }

  async updateAdmin(id: string, newAdmin: string) {
    let group = await this.groupDocument.findById(id);
    group.admin = mongoose.Types.ObjectId(newAdmin);
    return group.save();
  }

  async updateName(id: string, newName: string) {
    let group = await this.groupDocument.findById(id);
    group.name = newName;
    return group.save();
  }

  async remove(id: string) {
    return await this.groupDocument.findByIdAndRemove(id);
  }
}
