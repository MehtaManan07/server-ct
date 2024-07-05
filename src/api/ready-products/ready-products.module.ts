import { Module } from '@nestjs/common';
import { ReadyProductsService } from './ready-products.service';
import { ReadyProductsController } from './ready-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadyProduct } from './entities/ready-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadyProduct])],
  controllers: [ReadyProductsController],
  providers: [ReadyProductsService],
})
export class ReadyProductsModule {}
