import { GroupService } from './group.service';
import { CreateGroupInterface } from '../../../../common/interfaces/create-group.interface';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @MessagePattern({ cmd: 'createGroup' })
  create( body: CreateGroupInterface) {
    return this.groupService.create(body);
  }

  @MessagePattern({ cmd: 'findGroups' })
  findAll() {
    return this.groupService.findAll();
  }

  @MessagePattern({ cmd: 'findGroup' })
  findOne(id: string) {
    return this.groupService.findOne(id);
  }

}
