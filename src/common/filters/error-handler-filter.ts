import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage: string | null =
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.message || null
        : 'Internal Server Error';

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
    this.logger.error(JSON.stringify(errorResponse));

    response.status(status).json(errorResponse);
  }
}
