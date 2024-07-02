import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Category } from './category.entity';

@Entity()
@Unique(['name', 'size'])
export class RawMaterial extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column()
  packetsAvailable: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  unit: string;

  @Column()
  size: number;

  @Column('text', { array: true })
  categories: string[];

  @Column()
  weightPerUnit: number;

  @Column()
  totalWeight: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  slug: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  color: string;

  @ManyToOne(() => Category, (category) => category.rawMaterials)
  parentCategory: Category;

  @OneToMany(() => TaskToMaterial, (tasks) => tasks.rawMaterial)
  public taskToMaterials: TaskToMaterial[];
}
