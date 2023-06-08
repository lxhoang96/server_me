
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SessionService } from '../session/session.service';
// import { ResponseDefault } from 'common/response.model';
import { ResponseCode } from 'common/response.code';
import { CreateUserInterface } from '../../../../common/interfaces/create-user.interface';
import { SigninInterface } from '../../../../common/interfaces/signin.interface';
import { SessionInterface } from '../../../../common/interfaces/session.interface';

// const {
//   publicEncrypt,
//   privateDecrypt,
// } = require('crypto');
@Injectable()
export class AuthService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
  ) { 
    console.log('auth service alive!')
    console.log(this.sessionService)
    console.log(this.usersService)
  }

  async signIn(signinDTO: SigninInterface): Promise<any> {
    console.log(signinDTO);

    const user = await this.usersService.findOne(signinDTO.type, signinDTO.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user);
    if (user.password !== signinDTO.password) {
      throw new UnauthorizedException();
    }
    await this.sessionService.endAllUserSession(user.id);
    signinDTO.sessionDTO.userID = user.id;
    let newSession = await this.sessionService.createSession(signinDTO.sessionDTO);
    const encryptedSession = this.usersService.encryptPublic(user.publicKey, newSession.id);
    newSession.value = encryptedSession;
    newSession.save();
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { id: user.id, session: encryptedSession };
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

  async signOut(id: string, session: string) {
    const user = await this.usersService.findOneById(id);
    const currentSession = await this.usersService.decryptPrivate(user.privateKey, session);
    return await this.sessionService.endSession(currentSession._id);
    // const response = new ResponseDefault(ResponseCode.Success, isCurrentSession);
    // return response.toJson();
  }

  async autoLogin(id: string, value: string, sessionDto: SessionInterface) {
    const session = await this.sessionService.findByValue(value);
    if (!session || session.isExpired || !this.isSubObject(JSON.stringify(session), JSON.stringify(sessionDto))) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!session.userID.equals(user._id)) {
      console.log('3');
      throw new UnauthorizedException();
    }
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
        console.log('1.1');
        return false;
      }
      if (object2.key != object1.key) {
        console.log('1.2');
        return false;
      }
    }
    return true;
  }

  async validateToken(token: string) {
    const session = await this.sessionService.findByValue(token);
    if (!session || session.isExpired) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneById(session.userID.toHexString());
    if (!user) {
      return new UnauthorizedException();
    }
    return user._id;
  }
}