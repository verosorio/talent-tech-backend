import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from '@infrastructure/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(envs.PORT);
}
bootstrap();
