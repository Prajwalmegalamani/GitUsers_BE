import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // You can also pass specific options here if needed
  await app.listen(3000);
}
bootstrap();
