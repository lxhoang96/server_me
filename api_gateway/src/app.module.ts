import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AUTH_SERVICE } from "../../common/services.name";
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
      ],
      isGlobal: true
    }),
    AuthModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule { }