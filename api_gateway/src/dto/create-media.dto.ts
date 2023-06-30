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


  @ApiProperty({enum: MediaType, default: MediaType.Image})
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File

}

export class CreateMediasDto {

  @IsNotEmpty()
  @ApiProperty({ enum: PlatformMedia, default: PlatformMedia.Other })
  platform: string;


  @ApiProperty({ enum: MediaType, default: MediaType.Image })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: 'array', items: {
      type: 'string',
      format: 'binary',
    }, required: true
  })
  files: Array<Express.Multer.File>
}