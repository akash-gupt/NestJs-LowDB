import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LowdbService } from './lowdb/lowdb.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LowdbService],
})
export class AppModule {}
