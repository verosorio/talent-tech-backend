import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from '@infrastructure/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('TalentTech Backend API')
    .setDescription('API para gestión de empleados y departamentos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envs.PORT);
  console.log(`🚀 Server running on http://localhost:${envs.PORT}`);
  console.log(`📄 Swagger docs available at http://localhost:${envs.PORT}/api`);
}
bootstrap();
