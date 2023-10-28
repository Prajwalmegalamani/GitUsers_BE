import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Disable CORS
  app.enableCors({ origin: false });

  await app.listen(3000);
}
bootstrap();
