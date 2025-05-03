import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionsFilter } from './common/filters/global-exceptions.filter';

async function bootstrap() {
  const isDev = process.env.NODE_ENV !== 'production';
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'WappTienda',
      logLevels: isDev
        ? ['error', 'warn', 'log', 'debug']
        : ['error', 'warn', 'log'],
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
