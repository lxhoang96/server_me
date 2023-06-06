import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  SessionObj, SessionSchema } from './schemas/sessions.schema';

@Module({
  imports: [
  
    MongooseModule.forFeature([{ name: SessionObj.name, schema: SessionSchema, collection: 'session' }]),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule { }
