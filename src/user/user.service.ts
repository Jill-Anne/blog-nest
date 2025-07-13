import { CreateUserDto } from '@/user/dto/createUser.dto';
import { UserEntity } from '@/user/user.entity';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // Injecting the UserEntity repository to interact with the database
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity(); // new instance of UserEntity
    Object.assign(newUser, createUserDto); // Assigning properties from CreateUserDto to UserEntity
    // from body of request to newUser
    /*
    newUser = {
      name: "Jill",
      email: "jill@example.com"
    }
    */
    return await this.userRepository.save(newUser); //save new user in db
  }
}
