import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserInterface } from '../../../../common/interfaces/create-user.interface';
const {
  generateKeyPairSync,
    publicEncrypt,
  privateDecrypt,
} = require('crypto');
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private users: Model<User>,) { }

  async create(newUser: CreateUserInterface): Promise<User | undefined> {
    if(this.validate(newUser)){
      const createdUser = new this.users(newUser);
      const keys = this.genKeys(createdUser.id);
      createdUser.privateKey = keys.privateKey;
      createdUser.publicKey = keys.publicKey;
    return await createdUser.save();
    }
  }

  update(id: string, newUser: CreateUserInterface): Promise<User | undefined> {
    return this.users.findByIdAndUpdate(id, newUser);
  }

  findOneById(id: string): Promise<User | undefined> {
    return this.users.findById(id);
  }

  findOne(newType: string, newId: string): Promise<User | undefined> {
    switch (newType) {
      case 'discordId':
        return this.users.findOne({ discordId: newId }).exec();
        
        case 'telegramId':
        return this.users.findOne({ telegramId: newId }).exec();
          case 'email':
        return this.users.findOne({ email: newId }).exec();
        case 'phoneNumber':
        return this.users.findOne({ phoneNumber: newId }).exec();
      default:
        return null;
    }
  }

  async find(newUser: CreateUserInterface): Promise<Array<User>> {
    const params = [];
    if (newUser.discordId) {
      params.push({discordId: newUser.discordId });
        }
        if(newUser.telegramId){
          params.push({ telegramId: newUser.telegramId });

        }
        if(newUser.email){
          params.push({ email: newUser.email });

        }
        if(newUser.phoneNumber){
          params.push({ phoneNumber: newUser.phoneNumber });

        }
    return  await this.users.find().or(params).exec();
  }


  validate(user: CreateUserInterface) {
    if( user.discordId || user.telegramId || user.email || user.phoneNumber)  // for async validations you must return a Promise<boolean> here
    {
        return user;
    }
    return null;
  }

  async getProfile(id: string): Promise<any> {
    const profile = await this.users
      .findById(id)
      .select('-password -_id -createdAt -updatedAt -privateKey -publicKey -__v')
      .lean();

    return profile;
  }

  encryptPublic(key: string, newSession: any): string {
    const encrypted = publicEncrypt(key, Buffer.from(newSession));
    return encrypted.toString("base64");
  }

  async decryptPrivate(key: string, newSession: string): Promise<any> {
    return await publicEncrypt(key, Buffer.from(newSession));
  }

  genKeys(password: string){
    const {
      publicKey,
      privateKey,
    } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: password,
      },
    });
  return {
    publicKey,
    privateKey,
  };
}
}