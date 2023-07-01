// import { Controller, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Controller, Inject, StreamableFile } from '@nestjs/common';

@Controller()
export class MediaController {
  constructor(
    private readonly mediaService: MediaService) { }

  @MessagePattern({ cmd: 'uploadImage' })
  uploadImage(
    req: any
  ) {
    console.log(req);
    return this.mediaService.create(req.newMedia, req.paths);
  }

  @MessagePattern({ cmd: 'getMedia' })
  async getMedia(req: any) {
    console.log(req);
    const media = await this.mediaService.findOne(req.id);
    if (media) {
      return media.paths[req.index];
    }
    throw new RpcException('No file found!');
  }
}