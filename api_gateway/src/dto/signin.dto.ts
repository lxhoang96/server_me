import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SessionDto } from "./session.dto";
import { SigninInterface } from '../../../common/interfaces/signin.interface';


export class SigninDTO extends SigninInterface{

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  sessionDTO: SessionDto;
}
