import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsArray } from "class-validator";


export class CreateAlbumDto {

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: string;

  @ApiProperty({default: [] })
  @IsArray()
  @IsOptional()
  media: string[];

  @ApiProperty({ default: [] })
  @IsArray()
  @IsOptional()
  subGroup: string[];
}
