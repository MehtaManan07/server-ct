import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoggerService } from 'src/common/logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { RawMaterialsService } from '../raw-materials/raw-materials.service';
import { TaskMaterialsService } from '../task-materials/task-materials.service';

@Injectable()
export class TasksService {
  constructor(
    private logger: LoggerService,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private rawMaterialService: RawMaterialsService,
    private taskMaterialsService: TaskMaterialsService,
    private readonly entityManager: EntityManager,
  ) {
    this.logger.setContext(TasksService.name);
  }

  async create(createTaskDto: CreateTaskDto): Promise<void> {
    // 1. check if the quantities requested are available in the inventory
    await this.rawMaterialService.checkMaterialsAvailability(
      createTaskDto.rawMaterialQuantities,
    );
    await this.entityManager.transaction(async (entityManager) => {
      // 2. create work order entry
      const dataToSaveInWorkOrder = {
        description: createTaskDto.description,
        jobberId: createTaskDto.jobberId,
        status: createTaskDto.status,
      };
      const res = await entityManager.save(Task, dataToSaveInWorkOrder);
      await this.taskMaterialsService.createBulk(
        entityManager,
        createTaskDto.rawMaterialQuantities,
        res.id,
      );
      // 3. update raw materials quantities
      await this.rawMaterialService.updateMaterialsQuantities(
        entityManager,
        createTaskDto.rawMaterialQuantities,
      );
      return res;
    });

    return;
  }

  async findAll(jobberId?: number) {
    const query: FindOptionsWhere<Task> = {};
    if (jobberId) {
      query.jobberId = jobberId;
    }
    const tasks = await this.taskRepository.find({
      where: query,
      relations: {
        taskToMaterials: true,
      },
    });
    this.logger.log({ query });
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return { updateTaskDto, id };
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
