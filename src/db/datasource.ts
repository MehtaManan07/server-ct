import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from './config';
export default new DataSource(dbConfig as DataSourceOptions);
export { DataSource as DbSource };
