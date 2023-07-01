import { HttpException, HttpStatus, Inject, Injectable, StreamableFile } from '@nestjs/common';
import { AUTH_SERVICE, MEDIA_SERVICE } from '../../../common/services.name';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMediaDto } from 'src/dto/create-media.dto';
import { catchError, firstValueFrom, range, timeout } from 'rxjs';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { rootDest } from './interceptors/config.intercepter';
const os = require('os');

@Injectable()
export class MediaService {

  constructor(
    @Inject(MEDIA_SERVICE)
    private readonly mediaService: ClientProxy

  ) {
  }
  async create(newMedia: any, userID: string, paths: string[]) {
    const uploaderPattern = { cmd: "createUploader" };
    const newUploader = await firstValueFrom(this.mediaService
      .send<string>(uploaderPattern, { userID })
      .pipe(
        timeout(3000),
        catchError(err => {
          throw err;
        }),
      ),
    );
    // newMedia = uploader;
    if (newUploader) {
      newMedia['uploader'] = newUploader;
    } else {
      throw new HttpException("Can not create new uploader", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const pattern = { cmd: "uploadImage" };
    const newPaths = [];
    for (const each of paths) {
      newPaths.push(each.split(rootDest).pop())
    }
    console.log(newPaths)
    const result = this.mediaService
      .send<any>(pattern, { newMedia, paths: newPaths })
      .pipe(
        catchError(err => {
          throw err;
        }),
      );
    return result;
  }

  async streamFile(mediaId: string, index: number): Promise<string> {
    const getMedia = { cmd: "getMedia" };
    const media = await firstValueFrom(this.mediaService
      .send<string>(getMedia, { id: mediaId, index })
      .pipe(
        // timeout(5000),
        catchError(err => {
          throw err;
        }),));
    // newMedia = uploader;
    if (media) {
      
      // const file = createReadStream(join(rootDest, media));
      return join(rootDest, media);
    } else {
      throw new HttpException("Can not find media", HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
