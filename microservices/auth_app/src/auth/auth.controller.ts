import {  Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, } from '@nestjs/microservices';
import { CreateUserInterface } from '../../../../common/interfaces/create-user.interface';
import { SigninInterface } from '../../../../common/interfaces/signin.interface';
import { of } from 'rxjs';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService)
  { }
 
  @MessagePattern({ cmd: 'signIn' })
  async signIn(data: SigninInterface) {
    const result = await this.authService.signIn(data);
    return of(result).pipe();

  }

  @MessagePattern({ cmd: 'register' })
  async register(createUserDTO: CreateUserInterface) {
    return this.authService.register(createUserDTO);
  }

  @MessagePattern({ cmd: 'autoLogin' })
  async autoLogin(req: any) {
    const session = await this.authService.autoLogin(req.session, req.sessionDto);
    return session;
  }

  @MessagePattern({ cmd: 'validateToken' })
  async validateToken(req: any) {
    // const result = await this.authService.validateToken(req.token, req.body);
    const result = await this.authService.validateToken(req.token);
    return result;
  }

}
