import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";

export class CreateGroupDto {

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: string;

  @ApiProperty({ default: [] })
  @IsArray()
  users: string[];
}
