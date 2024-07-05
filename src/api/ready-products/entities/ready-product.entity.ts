import { Task } from 'src/api/tasks/entities/task.entity';
import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ReadyProduct extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  shape: string;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'varchar', length: 100 })
  size: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column()
  taskId: number;

  @ManyToOne(() => Task, (task) => task.readyProducts)
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
