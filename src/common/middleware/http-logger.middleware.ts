import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: Request, _res: any, next: () => void) {
    const { method, originalUrl, ip, headers } = req;
    const userAgent = headers['user-agent'];

    this.logger.log(`HTTP ${method} ${originalUrl} - ${ip} - ${userAgent}`);

    next();
  }
}
