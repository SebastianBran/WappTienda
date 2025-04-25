import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionsFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    let message = 'Internal server error';
    if (exception instanceof Error || exception instanceof HttpException) {
      message = exception.message;
    }

    if (exception instanceof TypeORMError) {
      switch (exception.constructor) {
        case QueryFailedError:
          status = HttpStatus.BAD_REQUEST;
          break;
        case EntityNotFoundError:
          status = HttpStatus.NOT_FOUND;
          break;
      }
    }

    let exceptionName = 'Unknown Error';
    if (exception instanceof Error) {
      exceptionName = exception.name;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exceptionName,
    });

    this.logger.error(`HTTP ${method} ${url} (${status}) - Error: ${message}`);
  }
}
