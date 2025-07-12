import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TagEntity } from './tag/tag.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'devuser',
  password: '1234',
  database: 'blog',
  //entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [TagEntity],
  synchronize: true,
};

export default config;
