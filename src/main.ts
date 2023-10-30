import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://git-users-fe-cros.vercel.app/', // replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });
  // other configurations
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
