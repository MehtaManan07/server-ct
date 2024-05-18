import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/api/users/entities/user.entity';
import { RawMaterial } from 'src/api/raw-materials/entities/raw-material.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';

dotenvConfig({ path: '.env' });

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `${process.env.PG_HOST}`,
  username: `${process.env.PG_USER}`,
  password: `${process.env.PG_PASSWORD}`,
  database: `${process.env.PG_DATABASE}`,
  entities: [RawMaterial, User, Task, TaskToMaterial],

  synchronize: true,
  migrationsTableName: 'migration_table',
  migrations: ['migrations/*.ts'],
  // ssl: true,
  autoLoadEntities: true,
};

export default registerAs('db', () => dbConfig);
export const ConnectionSource = new DataSource(dbConfig as DataSourceOptions);
