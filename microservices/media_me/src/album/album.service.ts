import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumDocument } from './schemas/album.schema';
import { CreateMediaDto } from 'src/media/dto/create-media.dto';
import { MediaService } from 'src/media/media.service';
import { MediaDocument } from 'src/media/schemas/media.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(AlbumDocument.name)
    private albumDocument: Model<AlbumDocument>,
  ) { }
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new this.albumDocument(createAlbumDto);
    return newAlbum.save();
  }

  async findAll() {
    return await this.albumDocument.find().exec();
  }

  async findOne(id: string) {
    return await this.albumDocument.findById(id);
  }

  async updateMedia(id: string, newMedia: MediaDocument[]) {
    let album = await this.albumDocument.findById(id);
    album.media = newMedia;
    return album.save();
  }

  async updateSubAlbum(id: string, subGroup: AlbumDocument[]) {
    let album = await this.albumDocument.findById(id);
    album.subGroup = subGroup;
    return album.save();
  }

  async updateName(id: string, newName: string) {
    let album = await this.albumDocument.findById(id);
    album.name = newName;
    return album.save();
  }

  async remove(id: string) {
    return await this.albumDocument.findByIdAndRemove(id);
  }
}
