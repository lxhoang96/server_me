import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumDocument } from './schemas/album.schema';
import { MediaDocument } from 'src/media/schemas/media.schema';
import { CreateAlbumInterface } from '../../../../common/interfaces/create-album.interface';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(AlbumDocument.name)
    private albumDocument: Model<AlbumDocument>,
  ) { }
  
  create(createAlbumInterface: CreateAlbumInterface) {
    const newAlbum = new this.albumDocument(createAlbumInterface);
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
