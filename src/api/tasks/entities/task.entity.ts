// task.entity.ts
import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { User } from 'src/api/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  jobberId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'jobberId' })
  jobber: User;

  @OneToMany(() => TaskToMaterial, (taskToMaterial) => taskToMaterial.task)
  public taskToMaterials: TaskToMaterial[];
}
