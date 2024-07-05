import { Module } from '@nestjs/common';
import { RawMaterialsService } from './raw-materials.service';
import { RawMaterialsController } from './raw-materials.controller';
import { RawMaterial } from './entities/raw-material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { PurchaseRecord } from './entities/raw-material-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial, Category, PurchaseRecord])],
  controllers: [RawMaterialsController],
  providers: [RawMaterialsService],
  exports: [RawMaterialsService],
})
export class RawMaterialsModule {}
