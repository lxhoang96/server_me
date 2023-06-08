import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './interceptors/config.intercepter';
import { CreateMediaDto } from 'src/dto/create-media.dto';
// import { FileSizeValidationPipe } from './validations/file_size.validation';

@Controller('media')

export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadSingleImage(
    @Body() body: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mediaService.create(body, [file.path]);
  }

  @Post('uploadListImage')
  @UseInterceptors(FilesInterceptor('files', 100, multerOptions))
  uploadListImage(
    @Body() body: CreateMediaDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, paths);
  }

  @Post('uploadMultiImages')
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  uploadMultiImages(
    @Body() body: CreateMediaDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, paths);
  }

}