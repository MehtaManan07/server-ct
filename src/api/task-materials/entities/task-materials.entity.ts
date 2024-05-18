import { RawMaterial } from 'src/api/raw-materials/entities/raw-material.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskToMaterial {
  @PrimaryGeneratedColumn()
  id: number;

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
