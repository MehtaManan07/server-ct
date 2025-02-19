import { ReadyProduct } from 'src/api/ready-products/entities/ready-product.entity';
import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { User } from 'src/api/users/entities/user.entity';
import { BaseEntity } from 'src/db/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @Column()
  jobberId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'jobberId' })
  jobber: User;

  @Column()
  type: string;

  @OneToMany(() => TaskToMaterial, (taskToMaterial) => taskToMaterial.task)
  public taskToMaterials: TaskToMaterial[];

  @OneToMany(() => ReadyProduct, (readyProduct) => readyProduct.task)
  readyProducts: ReadyProduct[];
}
