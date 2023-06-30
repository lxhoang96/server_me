import { Controller, Post, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionService } from 'src/session/session.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(
    private userService: UsersService,
    private sessionService: SessionService,
  ) { }

  // @Post('me')
    
  // @ApiHeader({
  //   name: 'session',
    
  // })
  @MessagePattern({ cmd: 'me' })
  async getProfile(req) {
    const session = await this.sessionService.findByValue(req.session);
    return await this.userService.getProfile(session.userID.toString());
  }
}
