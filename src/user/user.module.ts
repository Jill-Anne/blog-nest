import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';

// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
