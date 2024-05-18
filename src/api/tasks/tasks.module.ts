import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskMaterialsModule } from '../task-materials/task-materials.module';
import { RawMaterialsModule } from '../raw-materials/raw-materials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TaskMaterialsModule,
    RawMaterialsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
