
// import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: process.env.POSTGRES_HOST || 'postgres',
//     port: +process.env.POSTGRES_PORT || 5432,
//     username: process.env.DB_USERNAME || 'postgres',
//     password: process.env.DB_PASSWORD || '27894869',
//     database: process.env.POSTGRES_DB || 'chat',
//     // entities: [__dirname + '../src/**/*.entity.ts', __dirname + '../src/**/*.entity.js'],
//     entities: [__dirname + './../**/*.entity{.ts,.js}'],
//     migrationsRun: false,
//     logging: true,
//     migrationsTableName: "migrations",
//     migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//     synchronize: false,
//     cli: {
//         entitiesDir: __dirname + './../**/*.entity{.ts,.js}',
//         migrationsDir: 'src/migration'
//     }
// }

// export default typeOrmConfig

import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import databaseConfig from  './config/database-config';

export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return databaseConfig;
  },
};