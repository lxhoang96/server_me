import { Injectable } from '@nestjs/common';
import { GroupDocument } from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploaderDocument } from 'src/uploader/schemas/uploader.schema';
import { CreateGroupInterface } from '../../../../common/interfaces/create-group.interface';

var mongoose = require('mongoose');
@Injectable()
export class GroupService {
  constructor(
    @InjectModel(GroupDocument.name)
    private groupDocument: Model<GroupDocument>,
  ) { }
  create(createGroupInterface: CreateGroupInterface) {
    const newGroup = new this.groupDocument(createGroupInterface);
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
