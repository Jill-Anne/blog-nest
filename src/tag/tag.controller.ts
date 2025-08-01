import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  async getAll() {
    const allTags = await this.tagService.getAll();
    const tags: string[] = allTags.map((tag) => tag.name);
    return { tags };
  }
}
