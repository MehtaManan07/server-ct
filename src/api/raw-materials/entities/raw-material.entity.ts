import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'size'])
export class RawMaterial extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column()
  packetsAvailable: number;

  @Column({ default: 'mm' })
  unit: string;

  @Column()
  size: number;

  @Column('text', { array: true })
  categories: string[];

  @Column()
  weightPerUnit: number;

  @Column()
  totalWeight: number;

  @OneToMany(() => TaskToMaterial, (tasks) => tasks.rawMaterial)
  public taskToMaterials: TaskToMaterial[];
}
