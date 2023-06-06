// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());
//   const options = new DocumentBuilder()
//     .setTitle('My server API document')
//     .setDescription('The API description')
//     .setVersion('1.0')
//     .addServer(process.env.SWAGGER_SERVER_PATH)
//     .addBearerAuth({
//       type: 'http',
//     })
//     .addSecurityRequirements('bearer')
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('docs', app, document);
//   app.enableCors();
//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: { port: 4000, host: '127.0.0.1' },
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();