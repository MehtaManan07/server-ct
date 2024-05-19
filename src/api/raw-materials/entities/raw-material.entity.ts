import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { BaseEntity } from 'src/db/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

// CREATE TABLE Stones (
//   StoneID SERIAL PRIMARY KEY,
//   StoneName VARCHAR(255) NOT NULL,
//   SizeMM INT NOT NULL,
//   Color VARCHAR(50) NOT NULL,
//   PacketsAvailable INT NOT NULL,
//   TotalGramsAvailable INT NOT NULL,
//   PacketWeightGrams INT NOT NULL
// );
@Entity()
export class RawMaterial extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  // @Column({ unique: true })
  // name: string;

  // @Column({ nullable: true })
  // quantity: number;

  // @Column()
  // size: string;

  // @Column()
  // pricePerUnit: number;

  // @Column()
  // category: string;

  // @Column({ nullable: true })
  // description: string;

  // @Column({ nullable: true })
  // supplier: string;

  @OneToMany(() => TaskToMaterial, (tasks) => tasks.rawMaterial)
  public taskToMaterials: TaskToMaterial[];
}
