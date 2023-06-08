import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs/operators';
import { SigninDTO } from 'src/dto/signin.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AUTH_SERVICE } from '../../../common/services.name';

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
    // result.forEach(value => console.log(value));
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

  autoLogin(req: any) {
    const pattern = { cmd: "autoLogin" };
    return this.authService
      .send<string>(pattern, req)
      .pipe(
        map((message: any) => (message))
      );
  }

  validateUser(token: string) {
    const pattern = { cmd: "validateUser" };
    return this.authService
      .send<string>(pattern, token)
      .pipe(
        map((message: any) => (message))
      );
  }
}
