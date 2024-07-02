import { Module } from '@nestjs/common';
import { TaskMaterialsService } from './task-materials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskToMaterial } from './entities/task-materials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskToMaterial])],
  providers: [TaskMaterialsService],
  exports: [TaskMaterialsService],
})
export class TaskMaterialsModule {}
