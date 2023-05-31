import { DataSourceOptions } from 'typeorm';

import { Language, User, Word } from '@backend/entities';

const nodeEnv = process.env.NODE_ENV ?? 'development';

const getDataSourceConfig = (): DataSourceOptions => ({
  type: "sqlite",
  database: nodeEnv === 'development' ? 'sqlite.dev' : 'sqlite.test',
  entities: [Language, User, Word],
  synchronize: true,
})

export { getDataSourceConfig };