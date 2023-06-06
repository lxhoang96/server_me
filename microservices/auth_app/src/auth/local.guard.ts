// import { Strategy } from 'passport-local';
// import { PassportStrategy, AuthGuard } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super(
//       {
//         usernameField: 'username',
//         // typeField: 'type',
//         passwordField: 'password',
//         // sessionField: 'sessionDto',
//         passReqToCallback: true,
//       }
//     );
//   }

//   async validate(req: any, username: string, password: string): Promise<any> {
//     console.log(req.body);
//     console.log(username);
//     console.log(password);
//     const user = await this.authService.validateUser(username, req.body.type, password, req.body.sessionDTO);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }


// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') { }