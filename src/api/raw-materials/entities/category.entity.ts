import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RawMaterial } from './raw-material.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @OneToMany(() => RawMaterial, (rawMaterial) => rawMaterial.parentCategory)
  rawMaterials: RawMaterial[];
}
