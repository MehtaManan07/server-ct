import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { LoggerService } from '../logger';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  constructor(private logger: LoggerService) {
    this.logger.setContext(ErrorHandler.name);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal Server Error';

    if (exception instanceof QueryFailedError) {
      // TypeORM query failed error handling
      status = HttpStatus.BAD_REQUEST; // You can customize the status code for TypeORM errors
      errorMessage = exception.message || 'TypeORM Query Failed Error';
    } else if (exception.response && exception.response.statusCode) {
      // Handle other HTTP exceptions
      status = exception.response.statusCode;
      errorMessage = exception.response.message || null;
    }

    const errorResponse = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: errorMessage,
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // Log the internal server errors
      console.error(exception);
    }
    this.logger.error(errorResponse);

    response.status(status).json(errorResponse);
  }
}
