import {
  IsNotEmpty,
  IsEmail,
  Validate,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlatformMedia } from 'src/media/enums/platform.enum';
import { MediaType } from 'src/media/enums/media_type.enum';

export class CreateMediaDto {

  @IsNotEmpty()
  @ApiProperty({ enum: PlatformMedia, default: PlatformMedia.Other })
  platform: string;

  @IsNotEmpty()
  @ApiProperty()
  uploader: string;

  @ApiProperty({enum: MediaType, default: MediaType.Image})
  @IsNotEmpty()
  type: string;

}
