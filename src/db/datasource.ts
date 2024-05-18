import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from './config';

export default new DataSource(dbConfig as DataSourceOptions);
