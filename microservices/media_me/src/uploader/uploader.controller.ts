import { UploaderService } from './uploader.service';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';

@Controller()
export class UploaderController {
  constructor(
    private readonly uploaderService: UploaderService) {
    // console.log(this.uploaderService)
  }

  @MessagePattern({ cmd: 'createUploader' })
  create(req: any) {
    return this.uploaderService.create(req.userID);
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
