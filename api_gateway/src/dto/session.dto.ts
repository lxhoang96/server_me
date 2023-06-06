import { ApiProperty } from "@nestjs/swagger";

export class SessionDto {

  @ApiProperty({required:true})
  userID: string;

  @ApiProperty()
  currentDeviceID: string;

  @ApiProperty()
  currentIpAddress: string;

  @ApiProperty()
  currentLocation: string[];


}