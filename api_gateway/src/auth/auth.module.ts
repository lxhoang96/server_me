import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGatewayService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, MEDIA_SERVICE } from "../../../common/services.name";

@Global()
@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: AUTH_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       // host: "127.0.0.1",
    //       port: 4000
    //     }
    //   },
    
    // ]),
  ],
  controllers: [AuthController],
  providers: [AuthGatewayService],
  exports: [AuthGatewayService]
})
export class AuthModule {}
