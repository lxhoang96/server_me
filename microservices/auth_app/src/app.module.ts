import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';
// import { AuthGuard } from './auth/auth.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true, // <-- no longer necessary
        useUnifiedTopology: true, // <-- no longer necessary
      }),
      
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/server_me'),
    // PassportModule,
    AuthModule, 
    UsersModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    // provide: APP_GUARD,
    // useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
