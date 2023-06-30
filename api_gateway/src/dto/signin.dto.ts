import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SessionDto } from "./session.dto";
import { SigninInterface } from '../../../common/interfaces/signin.interface';
import { SigninType } from "src/auth/enums/auth.type.enum";


export class SigninDTO extends SigninInterface{

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  type: SigninType;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  sessionDTO: SessionDto;
}

