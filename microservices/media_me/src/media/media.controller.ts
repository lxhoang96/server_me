import { Controller, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './interceptors/config.intercepter';
import { CreateMediaInterface } from '../../../../common/interfaces/create-media.interface';
import { MessagePattern } from '@nestjs/microservices';

@Controller('media')

export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @MessagePattern({ cmd: 'uploadImage' })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadSingleImage(
     body: CreateMediaInterface,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mediaService.create(body, [file.path]);
  }

  @MessagePattern({ cmd: 'uploadListImage' })
  @UseInterceptors(FilesInterceptor('files', 100, multerOptions))
  uploadListImage(
  body: CreateMediaInterface,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, paths);
  }

  @MessagePattern({ cmd: 'uploadMultiImages' })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  uploadMultiImages(
    body: CreateMediaInterface,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, paths);
  }

}
