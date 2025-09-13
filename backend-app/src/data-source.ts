// src/data-source.ts
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './entities/User';
import { Product } from './entities/Product';

dotenv.config();

// En data-source.ts para producción
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || './local-database.sqlite',
  synchronize: process.env.NODE_ENV !== 'production', // ¡Cuidado en producción!
  logging: false,
  entities: [User, Product],
});