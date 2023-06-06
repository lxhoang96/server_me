import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber } from "class-validator";

export class CreateUserDto {

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsOptional()
  telegramId: string;

  @ApiProperty()
  @IsOptional()
  discordId: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  discordName: string;

  @ApiProperty()
  @IsOptional()
  telegramName: string;

  @ApiProperty()
  @IsOptional()
  nickname: string;
}
