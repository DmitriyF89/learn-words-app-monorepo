import { DataSourceOptions } from 'typeorm';

import { Language, User, Word } from '@backend/entities';

const nodeEnv = process.env.NODE_ENV ?? 'development';

const getDataSourceConfig = (): DataSourceOptions => ({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: nodeEnv === 'development' ? 'LearnWordsLocalDev' : 'LearnWordsLocalTest',
  entities: [Language, User, Word],
  synchronize: true,
  subscribers: [],
  migrations: [],
})

export { getDataSourceConfig };