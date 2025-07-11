import { TagController } from './tag.controller';
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';

@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [],
})
export class TagModule {}
