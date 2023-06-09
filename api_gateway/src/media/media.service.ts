import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE, MEDIA_SERVICE } from '../../../common/services.name';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMediaDto } from 'src/dto/create-media.dto';
import { timeout } from 'rxjs';

@Injectable()
export class MediaService {

  constructor(
    @Inject(MEDIA_SERVICE)
    private readonly mediaService: ClientProxy

  ) { }
  create(newMedia: CreateMediaDto, paths: string[]) {
    const uploaderPattern = { cmd: "createUploader" };
    this.mediaService
      .send<any>(uploaderPattern, newMedia.uploader)
      .subscribe(value => newMedia.uploader = value);
    const pattern = { cmd: "uploadImage" };
    const result = this.mediaService
      .send<any>(pattern, { newMedia, paths })
      .pipe(timeout(3000));
    // result.forEach(value => console.log(value));
    return result;
  }
}
