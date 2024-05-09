import { Module } from '@nestjs/common';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './raw-materials/entities/raw-material.entity';
import { Supplier } from './suppliers/entities/supplier.entity';
import { ConfigService } from '@nestjs/config';
console.log(process.env.PG_HOST);
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // url: 'postgresql://crafto-db_owner:ThNLRASu6Z4z@ep-snowy-dream-a1utqsrg.ap-southeast-1.aws.neon.tech/crafto-db?sslmode=require',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        entities: [RawMaterial, Supplier],
        synchronize: true,
        ssl: true,
        autoLoadEntities: true,
      }),
    }),

    RawMaterialsModule,
    SuppliersModule,
  ],
})
export class ApiModule {}
