import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/user/user.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
