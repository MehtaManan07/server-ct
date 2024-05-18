import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RawMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  quantity: number;

  @Column()
  size: string;

  @Column()
  pricePerUnit: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  supplier: string;

  @OneToMany(() => TaskToMaterial, (tasks) => tasks.rawMaterial)
  public taskToMaterials: TaskToMaterial[];
}
