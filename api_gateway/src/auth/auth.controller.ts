import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth.service';
import { ApiQuery, ApiTags, ApiHeader, ApiBody } from '@nestjs/swagger';
import { SigninDTO } from 'src/dto/signin.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthGatewayService) { }

  @Post('login')
  @ApiBody({
    type: SigninDTO,
  })
  signIn(@Body()  signinDTO: SigninDTO) {
    try {
      console.log(signinDTO.password);
      return this.authService.signIn(signinDTO);
    } catch (error) {
      console.log(error);
      return false;
    }
   
  }

  // @Public()
  @Post('register')
  async register(@Body() createUserDTO: CreateUserDto) {
    return this.authService.register(createUserDTO);
  }

  @Post('autoLogin')
  @ApiHeader({
    name: 'session',
  })
  @ApiHeader({
    name: 'id',
  })
  async autoLogin(@Body() req) {

    const id = await this.authService.autoLogin(req);
    console.log(id);
    return id;
  }
}
