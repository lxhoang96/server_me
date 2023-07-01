import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, UploadedFiles, Req, Headers, Get, StreamableFile, Param, Response, Header } from '@nestjs/common';
import { MediaService } from './media.service';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './interceptors/config.intercepter';
import { CreateMediaDto, CreateMediasDto } from 'src/dto/create-media.dto';
import { ApiConsumes, ApiHeader } from '@nestjs/swagger';
import { createReadStream, statSync } from 'fs';
import { Public } from 'src/auth/auth.guard';
// import { FileSizeValidationPipe } from './validations/file_size.validation';

@Controller('media')

export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('uploadMedia')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'session',
    description: 'Auth token',
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadSingleMedia(
    @Body() body: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: Record<string, string>
  ) {
    return this.mediaService.create(body, headers.id, [file.path]);
  }

  @Post('uploadListMedia')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'session',
    description: 'Auth token',
  })
  @UseInterceptors(FilesInterceptor('files', 100, multerOptions))
  uploadListMedia(
    @Body() body: CreateMediasDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers() headers: Record<string, string>
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, headers.id, paths);
  }

  @Post('uploadMultiMedias')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'session',
    description: 'Auth token',
  })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  uploadMultiMedias(
    @Body() body: CreateMediasDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers() headers: Record<string, string>
  ) {
    const paths = files.map(a => a.path);
    return this.mediaService.create(body, headers.id, paths);
  }

  @Public()
  @Get('stream/:media_id/:index')
  // @ApiHeader({
  //   name: 'session',
  //   description: 'Auth token',
  // })
  @Header('Accept-Ranges', 'bytes')
  async getFile(@Param('media_id') media_id: string, @Param('index') index: number, @Headers() headers, @Response({ passthrough: true }) res): Promise<StreamableFile> {

    const pathFile = await this.mediaService.streamFile(media_id, index);
    const readStream = createReadStream(pathFile);
    // readStream.on('data', (chunk) => console.log(chunk)); // <--- the data log gets printed
    // readStream.on('end', () => console.log('done'));
    // readStream.on('error', (err) => { console.error(err); });

    return new StreamableFile(readStream);
  }
}