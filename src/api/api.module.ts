import { Module } from '@nestjs/common';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [AuthModule, UsersModule, RawMaterialsModule],
  exports: [AuthModule, UsersModule],
})
export class ApiModule {}
