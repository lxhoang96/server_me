
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SessionService } from '../session/session.service';
// import { ResponseDefault } from 'common/response.model';
import { ResponseCode } from 'common/response.code';
import { CreateUserInterface } from '../../../../common/interfaces/create-user.interface';
import { SigninInterface } from '../../../../common/interfaces/signin.interface';
import { SessionInterface } from '../../../../common/interfaces/session.interface';
import { RpcException } from '@nestjs/microservices';

const {
  privateDecrypt,
} = require('crypto');
@Injectable()
export class AuthService {

  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
  ) { }

  async signIn(signinDTO: SigninInterface): Promise<any> {

    const user = await this.usersService.findOne(signinDTO.type, signinDTO.username);
    if (!user) {
      throw new RpcException('Invalid credentials.');

    }
    if (user.password !== signinDTO.password) {
      throw new RpcException('Invalid credentials.');

    }
    await this.sessionService.endAllUserSession(user.id);
    signinDTO.sessionDTO.userID = user.id;
    let newSession = await this.sessionService.createSession(signinDTO.sessionDTO);
    const encryptedSession = this.usersService.encryptPublic(user.publicKey, newSession.id);
    newSession.value = encryptedSession;
    newSession.save();
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { session: encryptedSession, publicKey: user.publicKey };
  }

  async register(newUser: CreateUserInterface): Promise<any> {
    const users = await this.usersService.find(newUser);
    if (users.length > 0) {
      const returnUsers = [];
      for (const user of users) {
        const result = {
          email: user.email, phonenNumber: user.phoneNumber,
          telegramName: user.telegramName, discordName: user.discordName, nickname: user.nickname
        };
        returnUsers.push(result);
      }
      return returnUsers;
      // const response = new ResponseDefault(ResponseCode.UserExist, returnUsers);
      // return response.toJson();
    }

    const createdUser = await this.usersService.create(newUser);
    const result = {
      email: createdUser.email, phonenNumber: createdUser.phoneNumber,
      telegramName: createdUser.telegramName, discordName: createdUser.discordName, nickname: createdUser.nickname
    };
    return result;
    // const response = new ResponseDefault(ResponseCode.Success, result);
    // return response.toJson();
  }

  async signOut(id: string, session: string): Promise<boolean> {
    const user = await this.usersService.findOneById(id);
    const currentSession = await this.decryptPrivate(user.privateKey, session);
    return await this.sessionService.endSession(currentSession._id);
    // const response = new ResponseDefault(ResponseCode.Success, isCurrentSession);
    // return response.toJson();
  }

  async autoLogin(value: string, sessionDto: SessionInterface): Promise<string> {
    const session = await this.sessionService.findByValue(value);
    if (!session || session.isExpired || !this.isSubObject(JSON.stringify(session), JSON.stringify(sessionDto))) {
      throw new RpcException('Invalid credentials.');
    }
    const user = await this.usersService.findOneById(session.userID.toHexString());
    if (!user) {
      throw new RpcException('Invalid credentials.');

    }

    // if (!session.userID.equals(user._id)) {
    //   throw new RpcException('Invalid credentials.');

    // }
    session.reLoginAt = new Date();
    session.expiredAt = new Date(session.reLoginAt.getTime() + parseInt(process.env.SESSION_TIMEOUT));
    delete session.value;
    session.value = this.usersService.encryptPublic(user.publicKey, session.id);
    await session.save();
    return session.value;
    // const response = new ResponseDefault(ResponseCode.Success, session.value);
    // return response.toJson();
  }

  isSubObject(object1, object2) {
    for (var key in object2) {
      // stop if the key exists in the subobject but not in the main object
      if (object2.hasOwnProperty(key) && !object1.hasOwnProperty(key)) {
        return false;
      }
      if (object2.key != object1.key) {
        return false;
      }
    }
    return true;
  }

  async validateToken(token: string, body: any): Promise<{id: string, body: any}> {
    const session = await this.sessionService.findByValue(token);

    if (!session || session.isExpired) {
      throw new RpcException('Invalid credentials.');

    }
    const user = await this.usersService.findOneById(session.userID.toHexString());
    if (!user) {
      throw new RpcException('Invalid credentials.');

    }
    const bodyDecrypted = await this.decryptPrivate(user.privateKey, body);
    
    return { id: user._id, body: bodyDecrypted };
  }

  async decryptPrivate(key: string, value: string): Promise<any> {
    return await privateDecrypt(key, Buffer.from(value));
  }
}

