import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  log(message: any, context: string) {
    const entry = `${context}\t ${message}`;
    super.log(message, context, entry);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${message}\t ${stackOrContext}`;
    super.error(message, stackOrContext, entry);
  }
}
