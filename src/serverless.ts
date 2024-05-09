import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import { Context, Handler } from 'aws-lambda';
import express from 'express';

import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  ErrorHandler,
  RequestIdMiddleware,
  setupSwagger,
  SuccessResponseInterceptor,
} from './common';
import { LoggerService } from './common/logger';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors();

    nestApp.useGlobalPipes(new ValidationPipe());
    nestApp.useGlobalFilters(new ErrorHandler(new LoggerService()));
    nestApp.useGlobalInterceptors(
      new ClassSerializerInterceptor(nestApp.get(Reflector)),
      new SuccessResponseInterceptor(),
    );

    nestApp.use(RequestIdMiddleware);
    nestApp.enableCors();
    setupSwagger(nestApp);

    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
