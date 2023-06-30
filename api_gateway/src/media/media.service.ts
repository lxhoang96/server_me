import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE, MEDIA_SERVICE } from '../../../common/services.name';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMediaDto } from 'src/dto/create-media.dto';
import { catchError, firstValueFrom, timeout } from 'rxjs';
@Injectable()
export class MediaService {

  constructor(
    @Inject(MEDIA_SERVICE)
    private readonly mediaService: ClientProxy

  ) { }
  async create(newMedia: any, userID: string, paths: string[]) {
    const uploaderPattern = { cmd: "createUploader" };
    const newUploader = await firstValueFrom(this.mediaService
      .send<string>(uploaderPattern, { userID })
      .pipe(
        timeout(5000),
        catchError(err => {
          throw err;
        }),));
    // newMedia = uploader;
    if (newUploader) {
      newMedia['uploader'] = newUploader;
    } else {
      throw new HttpException("Can not create new uploader", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    console.log(newMedia)
    const pattern = { cmd: "uploadImage" };
    const result = this.mediaService
      .send<any>(pattern, { newMedia, paths })
      .pipe(timeout(3000));
    return result;
  }
}
