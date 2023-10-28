import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const corsConfig = {
    origin: ['http://localhost:3001', 'https://git-users-fe.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*', 'Access-Control-Allow-Origin'],
  };
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig); // You can also pass specific options here if needed
  await app.listen(3000);
}
bootstrap();
