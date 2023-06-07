import {  Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, } from '@nestjs/microservices';
import { CreateUserInterface } from '../../../../common/interfaces/create-user.interface';
import { SigninInterface } from '../../../../common/interfaces/signin.interface';
import { of } from 'rxjs';
export class AuthController {

  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService)
  { }
 
  @MessagePattern({ cmd: 'signIn' })
  async signIn(data: SigninInterface) {
    const result = await this.authService.signIn(data);
    return of(result).pipe();

  }

  @MessagePattern({ cmd: 'register' })
  async register( createUserDTO: CreateUserInterface) {
    return this.authService.register(createUserDTO);
  }

  @MessagePattern({ cmd: 'autoLogin' })
  async autoLogin( req) {
    const id = await this.authService.autoLogin(req.id, req.session, req.sessionDto);
    console.log(id);
    return id;
  }
}
