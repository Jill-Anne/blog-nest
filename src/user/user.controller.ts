import { AuthRequest } from '@/types/expressRequest.interface';
import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginDto } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  ///createUser controller class method
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDto); // Logic to create a user would go here
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return user;

    //return this.userService.generateUserResponse(user);
  }

  @Get('user')
  async getCurrentUser(@Req() request: AuthRequest): Promise<IUserResponse> {
    console.log(request.user);
    //return 'get current user' as any;
    return this.userService.generateUserResponse(request.user);
  }
}
