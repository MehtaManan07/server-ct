import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskToMaterial } from './entities/task-materials.entity';
import { EntityManager, Repository } from 'typeorm';
import { LoggerService } from 'src/common/logger';

@Injectable()
export class TaskMaterialsService {
  constructor(
    @InjectRepository(TaskToMaterial)
    private taskMaterialRepository: Repository<TaskToMaterial>,
    private logger: LoggerService,
  ) {
    this.logger.setContext(TaskMaterialsService.name);
  }
  async createBulk(
    entityManager: EntityManager,
    materials: { materialId: number; quantityUsed: number }[],
    taskId: number,
  ) {
    const values = materials.map((material) => ({
      quantityUsed: material.quantityUsed,
      rawMaterialId: material.materialId,
      taskId,
    }));
    const result = await entityManager.save(TaskToMaterial, values);
    return result;
  }
}
