import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { applyCustomSerializationToJsTypes } from './custom-js-types-serialization';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { credentials: true, origin: 'http://localhost:3000' } });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(5001);
}
bootstrap();

applyCustomSerializationToJsTypes()