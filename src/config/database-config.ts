import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

console.log(__dirname )
const databaseConfig: DataSourceOptions = {
  name: 'default',
  migrationsRun: true,
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
//   host: process.env.POSTGRES_HOST || 'postgres',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '27894869',
  database: process.env.POSTGRES_DB || 'chat',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: true,
  migrationsTableName: "migrations",
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  
};

export default databaseConfig;