import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionModule } from 'src/session/session.module';
import { UsersService } from 'src/users/users.service';
import { SessionService } from 'src/session/session.service';
// import { LocalStrategy } from './local.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, SessionModule],
  // imports: [UsersService, SessionService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
