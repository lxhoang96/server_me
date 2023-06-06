import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUploaderDto {

  @ApiProperty()
  discordId: string;

  @ApiProperty()
  telegramId: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  discordName: string;

  @ApiProperty()
  telegramName: string;
}

