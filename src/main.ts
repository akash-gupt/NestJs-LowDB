import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  /**
   * Validation pipe added to work with class-validator
   * Go here to know more {@link https://docs.nestjs.com/techniques/validation}
   * 
   */
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
