import { AuthMiddleware } from '@/user/middlewares/auth.middleware';
import { UserController } from '@/user/user.controller';
import { UserEntity } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
