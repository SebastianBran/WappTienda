import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

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

    response.status(status).json({
      statusCode: status,
      message,
      error: exception instanceof Error ? exception.name : 'Unknown Error',
    });
  }
}
