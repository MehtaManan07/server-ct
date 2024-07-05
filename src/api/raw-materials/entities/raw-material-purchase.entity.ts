import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RawMaterial } from './raw-material.entity';

@Entity()
export class PurchaseRecord extends BaseEntity {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitWeight: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  supplier: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  invoiceNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column()
  rawMaterialId: number; // Only store the raw material id

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'rawMaterialId' })
  rawMaterial: RawMaterial;
}
