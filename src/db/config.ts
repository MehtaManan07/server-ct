import fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/api/users/entities/user.entity';
import { RawMaterial } from 'src/api/raw-materials/entities/raw-material.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { TaskToMaterial } from 'src/api/task-materials/entities/task-materials.entity';
import { Category } from 'src/api/raw-materials/entities/category.entity';
import { PurchaseRecord } from 'src/api/raw-materials/entities/raw-material-purchase.entity';

dotenvConfig({ path: '.env.production' });

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `${process.env.PG_HOST}`,
  username: `${process.env.PG_USER}`,
  password: `${process.env.PG_PASSWORD}`,
  port: parseInt(`${process.env.PG_PORT}`),
  database: `${process.env.PG_DATABASE}`,
  entities: [RawMaterial, User, Task, TaskToMaterial, Category, PurchaseRecord],
  extra: {
    trustServerCertificate: true,
    Encrypt: true,
    IntegratedSecurity: false,
  },
  ssl: {
    rejectUnauthorized: true,
    requestCert: true,
    ca: fs.readFileSync('bundle.pem').toString(),
  },

  // synchronize: true,

  migrations: ['dist/db/migrations/*.js'],
};

export default registerAs('db', () => dbConfig);
