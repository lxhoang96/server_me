import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, UploadedFiles, Req, Headers } from '@nestjs/common';
import { MediaService } from './media.service';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './interceptors/config.intercepter';
import { CreateMediaDto, CreateMediasDto } from 'src/dto/create-media.dto';
import { ApiConsumes, ApiHeader } from '@nestjs/swagger';
// import { FileSizeValidationPipe } from './validations/file_size.validation';

@Controller('media')

export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('uploadImage')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'session',
    description: 'Auth token',
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadSingleImage(
    @Body() body: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: Record<string, string>
  ) {
    console.log(headers.id)
    return this.mediaService.create(body, headers.id, [file.path]);
  }

  @Post('uploadListImage')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'session',
    description: 'Auth token',
  })
  @UseInterceptors(FilesInterceptor('files', 100, multerOptions))
  uploadListImage(
    @Body() body: CreateMediasDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers() headers: Record<string, string>
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, headers.id, paths);
  }

  @Post('uploadMultiImages')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'session',
    description: 'Auth token',
  })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  uploadMultiImages(
    @Body() body: CreateMediasDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers() headers: Record<string, string>

  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, headers.id, paths);
  }

}