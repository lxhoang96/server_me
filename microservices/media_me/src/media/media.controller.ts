// import { Controller, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaInterface } from '../../../../common/interfaces/create-media.interface';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

export class MediaController {
  constructor(private readonly mediaService: MediaService) { }


  @MessagePattern({ cmd: 'uploadImage' })
  uploadListImage(
    body: CreateMediaInterface,
    files: Array<Express.Multer.File>,
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, paths);
  }


}
