import { Module } from '@nestjs/common';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ReadyProductsModule } from './ready-products/ready-products.module';
@Module({
  imports: [AuthModule, UsersModule, RawMaterialsModule, TasksModule, ReadyProductsModule],
  exports: [AuthModule, UsersModule],
})
export class ApiModule {}
