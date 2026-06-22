import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service.js';

@Module({
  providers: [MyLoggerService]
})
export class MyLoggerModule {}
