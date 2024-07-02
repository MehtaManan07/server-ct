import { BaseEntity } from 'src/db/base.entity';
import { Entity, Column } from 'typeorm';

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  JOBBER = 'JOBBER',
}

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.JOBBER })
  role: Role;

  @Column({ nullable: true })
  contactInfo: string | null;
}
