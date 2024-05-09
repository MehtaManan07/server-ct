import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
