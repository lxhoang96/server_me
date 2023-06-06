import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { UploaderModule } from './uploader/uploader.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true, // <-- no longer necessary
        useUnifiedTopology: true, // <-- no longer necessary
      }),
      inject: [ConfigService],
    }),
    MediaModule,
    UploaderModule,
    AlbumModule,
    GroupModule],
  controllers: [AppController],
  providers: [AppService,
  
  ],
})
export class AppModule {}
