import { RawMaterial } from 'src/api/raw-materials/entities/raw-material.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactInfo: string;

  @OneToMany(() => RawMaterial, (rawMaterial) => rawMaterial.supplier)
  rawMaterials: RawMaterial[];
}
