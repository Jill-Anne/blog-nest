import { CreateUserDto } from '@/user/dto/createUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  ///createUser controller class method
  createUser(@Body('user') createUserDto: CreateUserDto): any {
    // Logic to create a user would go here
    return this.userService.createUser(createUserDto);
  }
}
