import { Body, Controller, Post, UseGuards, Request, Headers, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiHeader } from '@nestjs/swagger';
// import { LocalAuthGuard } from './local.guard';
import { MessagePattern, EventPattern, Payload, Ctx, NatsContext } from '@nestjs/microservices';
import { CreateUserInterface } from '../../../../common/interfaces/create-user.interface';
import { SigninInterface } from '../../../../common/interfaces/signin.interface';
import { delay, of } from 'rxjs';
export class AuthController {

  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService)
  { 
    console.log(this.authService);
  }

  // @Public()
  // @Post('login')
  // @UseGuards(LocalAuthGuard)
  // @ApiBody({
  //   type: SigninDTO,
  // })
  @MessagePattern({ cmd: 'signIn' })
  async signIn(data: SigninInterface) {
    // return this.authService.signIn(data);
    // return of('pong').pipe();
    if (!this.authService) {
      return 'test';
    }
    const result = await this.authService.signIn(data);
    return of(result).pipe();

  }

  // @Public()
  @MessagePattern({ cmd: 'register' })
  // @Post('register')
  async register( createUserDTO: CreateUserInterface) {
    return this.authService.register(createUserDTO);
    // return of(this.authService.register(createUserDTO)).pipe();
  }

  // @Post('autoLogin')
  // @ApiHeader({
  //   name: 'session',
  // })
  // @ApiHeader({
  //   name: 'id',
  // })
  @MessagePattern({ cmd: 'autoLogin' })
  async autoLogin( req) {

    const id = await this.authService.autoLogin(req.id, req.session, req.sessionDto);
    console.log(id);
    return id;
  }
}
