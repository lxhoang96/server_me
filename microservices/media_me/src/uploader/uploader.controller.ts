import { UploaderService } from './uploader.service';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @MessagePattern({ cmd: 'createUploader' })
  create(userID: string) {
    return this.uploaderService.create(userID);
  }

  @MessagePattern({ cmd: 'findAllUploader' })
  findAll() {
    return this.uploaderService.findAll();
  }

  @MessagePattern({ cmd: 'findUploader' })
  findOne( id: string) {
    return this.uploaderService.findOne(id);
  }

  @MessagePattern({ cmd: 'removeUploader' })
  remove( id: string) {
    return this.uploaderService.remove(+id);
  }
}
