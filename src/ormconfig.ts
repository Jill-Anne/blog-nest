import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TagEntity } from '@/tag/tag.entity';
import { UserEntity } from '@/user/user.entity';
import { DataSource } from 'typeorm';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'devuser',
  password: '1234',
  database: 'blog',
  //entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [TagEntity, UserEntity],
  //synchronize: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

const AppDataSource = new DataSource(config);

export { AppDataSource };
export default config;
