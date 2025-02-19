import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import dbConfig from './db/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './common/config/env/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, dbConfig],
      envFilePath: ['./.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('db'),
    }),
    CommonModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
