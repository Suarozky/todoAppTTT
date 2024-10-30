import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  logger = new Logger('Response');
  badRequestLogger = new Logger('BadRequest');
  badResponseLogger = new Logger('BadResponse');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      if (statusCode === 200 || statusCode === 201) {
        this.logger.log(
          `${method} ${url} ${statusCode} in ${resTime - reqTime} ms`,
        );
      } else if (statusCode === 400) {
        this.badRequestLogger.warn(
          `${method} ${url} ${statusCode} in ${resTime - reqTime} ms`,
        );
      } else {
        this.badResponseLogger.error(
          `${method} ${url} ${statusCode} in ${resTime - reqTime} ms`,
        );
      }
    });
    next();
  }
}
