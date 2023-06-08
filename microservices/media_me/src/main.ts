import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: { port: 3000, host: '127.0.0.1' },
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();