import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, timeout } from 'rxjs/operators';
import { SigninDTO } from 'src/dto/signin.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AUTH_SERVICE } from '../../../common/services.name';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGatewayService {

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: ClientProxy
  ) { }
  signIn(signinDTO: SigninDTO) {
    const pattern = { cmd: "signIn" };
    const result = this.authService
      .send<any>(pattern, signinDTO)
      .pipe(timeout(3000));
    return result;
  }

  register(createUserDTO: CreateUserDto) {
    const pattern = { cmd: "register" };
    return this.authService
      .send<string>(pattern, createUserDTO)
      .pipe(
        map((message: any) => (message))
      );
  }

  async autoLogin(req: any) {
    const pattern = { cmd: "autoLogin" };
    return await firstValueFrom(this.authService
      .send<string>(pattern, req)
      .pipe(
        timeout(5000),
        catchError(err => {
          throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }),));
  }

  async validateUser(token: string
    // , body: any
  ) {
    const pattern = { cmd: "validateToken" };
    const result = await firstValueFrom(this.authService
      // .send<{ id: string, body: any }>(pattern, { token, body })
      .send<{ id: string }>(pattern, { token })
      .pipe(
        timeout(5000),
        catchError(err => {
          throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);

        }),));
    return result;
  }
}
