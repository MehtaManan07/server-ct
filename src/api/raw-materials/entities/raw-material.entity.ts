import { Supplier } from 'src/api/suppliers/entities/supplier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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
  supplierId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.rawMaterials)
  supplier: Supplier;
}
