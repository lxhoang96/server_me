import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AUTH_SERVICE, MEDIA_SERVICE } from "../../common/services.name";
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4000
        },
        
      },
      // {
      //   name: MEDIA_SERVICE,
      //   transport: Transport.TCP,
      //   options: {
      //     host: "127.0.0.1",
      //     port: 3000
      //   }
      // },
    ],
      isGlobal: true
    }),
    AuthModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }