import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  ErrorHandler,
  RequestIdMiddleware,
  setupSwagger,
  SuccessResponseInterceptor,
} from './common';
import { LoggerService } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandler(new LoggerService()));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new SuccessResponseInterceptor(),
  );

  app.use(RequestIdMiddleware);
  app.enableCors();
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
