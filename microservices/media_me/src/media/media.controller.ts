// import { Controller, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';

@Controller()
export class MediaController {
  constructor(
    private readonly mediaService: MediaService) { }

  @MessagePattern({ cmd: 'uploadImage' })
  uploadImage(
    req: any
  ) {
    console.log(req);
    const paths = req.paths.map(a => a.path);
    return this.mediaService.create(req.newMedia, paths);
  }
}
