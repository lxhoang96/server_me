import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MEDIA_SERVICE } from '../../../common/services.name';
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register({
      clients: [
        {
          name: MEDIA_SERVICE,
          transport: Transport.TCP,
          options: {
            host: "127.0.0.1",
            port: 3000
          }
        },
      ],
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
