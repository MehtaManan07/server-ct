import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/api/users/entities/user.entity';
import { RawMaterial } from 'src/api/raw-materials/entities/raw-material.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { Category } from 'src/api/raw-materials/entities/category.entity';

dotenvConfig({ path: '.env.development' });

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `${process.env.PG_HOST}`,
  username: `${process.env.PG_USER}`,
  password: `${process.env.PG_PASSWORD}`,
  database: `${process.env.PG_DATABASE}`,
  entities: [RawMaterial, User, Task, TaskToMaterial, Category],
  // ssl: true,
  // synchronize: true,

  migrations: ['dist/db/migrations/*.js'],
};

export default registerAs('db', () => dbConfig);
