import { RawMaterial } from 'src/api/raw-materials/entities/raw-material.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class TaskToMaterial extends BaseEntity {
  @Column()
  public rawMaterialId: number;

  @Column()
  public taskId: number;

  @Column()
  public quantityUsed: number;

  @ManyToOne(() => RawMaterial, (material) => material.taskToMaterials)
  public rawMaterial: RawMaterial;

  @ManyToOne(() => Task, (task) => task.taskToMaterials)
  public task: Task;
}
