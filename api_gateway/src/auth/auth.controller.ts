import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth.service';
import { ApiQuery, ApiTags, ApiHeader, ApiBody } from '@nestjs/swagger';
import { SigninDTO } from 'src/dto/signin.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Public } from './auth.guard';
import { SessionDto } from 'src/dto/session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthGatewayService) { }

  @Public()
  @Post('login')
  @ApiBody({
    type: SigninDTO,
  })
  signIn(@Body() signinDTO: SigninDTO) {
    try {
      return this.authService.signIn(signinDTO);
    } catch (error) {
      return false;
    }
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDTO: CreateUserDto) {
    return this.authService.register(createUserDTO);
  }

  @Public()
  @Post('autoLogin')
  @ApiBody({
    type: SessionDto
  })
  async autoLogin(@Body() body) {
    const session = await this.authService.autoLogin(body);
    if (session) {
      return { "session": session };
    }
  }
}
