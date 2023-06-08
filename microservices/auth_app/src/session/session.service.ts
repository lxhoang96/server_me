import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionObj } from './schemas/sessions.schema';
import { SessionInterface } from '../../../../common/interfaces/session.interface';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionObj.name)
    private session: Model<SessionObj>,) { }

  async findByValue(valueCheck: string): Promise<SessionObj | undefined> {
    return this.session.findOne({ value: valueCheck }).exec();
  }

  async endAllUserSession(userId: string): Promise<boolean> {
    const currentSessiones = await this.session.find({ userID: userId, isExpired: false }).exec();
    if (!currentSessiones) return false;
    for (let currentSession of currentSessiones) {
      currentSession.isExpired = true;
      currentSession.logoutAt = new Date();
      currentSession.expiredAt = currentSession.logoutAt;
      currentSession.save();
    }
    return true;
  }

  async createSession(sessionDto: SessionInterface): Promise<SessionObj> {
    let createdSession = new this.session(sessionDto);
    createdSession.reLoginAt = new Date();
    createdSession.expiredAt = new Date(createdSession.reLoginAt.getTime() + parseInt(process.env.SESSION_TIMEOUT)); 
    return await createdSession.save();
  }

  async extendSession(id: string): Promise<SessionObj | undefined> {
    const currentSession = await this.session.findById(id);
    if (!currentSession) return;
    currentSession.reLoginAt = new Date();
    currentSession.expiredAt = new Date(currentSession.reLoginAt.getTime() + parseInt(process.env.SESSION_TIMEOUT)); 

    return await currentSession.save();
  }

  async endSession(id: string): Promise<boolean> {
    const currentSession = await this.session.findById(id);
    if (!currentSession) return false;
    currentSession.isExpired = true;
    currentSession.logoutAt = new Date();
    currentSession.expiredAt = currentSession.logoutAt;
    currentSession.save();
    return true;
  }
}
