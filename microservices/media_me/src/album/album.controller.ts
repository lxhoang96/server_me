import { AlbumService } from './album.service';
import { CreateAlbumInterface } from '../../../../common/interfaces/create-album.interface';
import { MessagePattern } from '@nestjs/microservices';
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @MessagePattern({ cmd: 'createAlbum' })
  create( createAlbumInterface: CreateAlbumInterface) {
    return this.albumService.create(createAlbumInterface);
  }

  @MessagePattern({ cmd: 'getAlbums' })
  findAll() {
    return this.albumService.findAll();
  }

  @MessagePattern({ cmd: 'getAlbum' })
  findOne( id: string) {
    return this.albumService.findOne(id);
  }

  @MessagePattern({ cmd: 'deleteAlbum' })
  remove( id: string) {
    return this.albumService.remove(id);
  }
}
