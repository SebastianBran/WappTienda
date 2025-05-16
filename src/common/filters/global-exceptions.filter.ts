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

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

@Catch()
export class GlobalExceptionsFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;

    if (exception instanceof HttpException) {
      this.handleHttpException(exception, response, method, url);
      return;
    }

    const errorResponse = this.createErrorResponse(exception);
    const { statusCode, message, error } = errorResponse;

    response.status(statusCode).json(errorResponse);

    this.logError(method, url, statusCode, error, message);
  }

  private handleHttpException(
    exception: HttpException,
    response: Response,
    method: string,
    url: string,
  ): void {
    const status = exception.getStatus();
    const errorType = exception.message;
    let message: unknown;

    if (typeof exception.getResponse() === 'string') {
      message = exception.getResponse();
    } else if (typeof exception.getResponse() === 'object') {
      const responseObj = exception.getResponse();
      message = responseObj['message'];
    } else {
      message = exception.getResponse();
    }

    response.status(status).json(exception.getResponse());

    this.logError(method, url, status, errorType, message);
  }

  private createErrorResponse(exception: unknown): ErrorResponse {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'Unknown Error';

    if (exception instanceof Error) {
      message = exception.message;
      errorType = exception.name;

      if (exception instanceof TypeORMError) {
        statusCode = this.getTypeormErrorStatus(exception);
      }
    }

    return {
      statusCode,
      message,
      error: errorType,
    };
  }

  private getTypeormErrorStatus(error: TypeORMError): number {
    if (error instanceof QueryFailedError) {
      return HttpStatus.BAD_REQUEST;
    }

    if (error instanceof EntityNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private logError(
    method: string,
    url: string,
    statusCode: number,
    error: string,
    message: unknown,
  ): void {
    this.logger.error(
      `HTTP ${method} ${url} (${statusCode}) - ${error}: ${JSON.stringify(
        message,
      )}`,
    );
  }
}
