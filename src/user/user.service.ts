import { CreateUserDto } from '@/user/dto/createUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { sign, verify } from 'jsonwebtoken'; // Assuming you will use jsonwebtoken for token generation
import { compare } from 'bcrypt';
import * as dotenv from 'dotenv';
import { LoginDto } from '@/user/dto/loginUser.dto';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // Injecting the UserEntity repository to interact with the database
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new UserEntity(); // new instance of UserEntity
    Object.assign(newUser, createUserDto); // Assigning properties from CreateUserDto to UserEntity
    // from body of request to newUser
    /*
    newUser = {
      name: "Jill",
      email: "jill@example.com"
    }
    */

    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email, // Check if a user with the same email already exists
      },
    });

    const userByUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username, // Check if a user with the same username already exists
      },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const savedUser = await this.userRepository.save(newUser); //save new user in db
    return this.generateUserResponse(savedUser);
  }

  generateToken(user: UserEntity): string {
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log('JWT_SECRET:', JWT_SECRET); // Log the secret for debugging
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const generatedToken = sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );

    const decoded = verify(generatedToken, JWT_SECRET); // match secret for consistency
    console.log(decoded);

    return generatedToken;
  }

  //Returns the user data along with a token.
  generateUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateToken(user), // Generate a token for the user
      },
    };
  }

  async loginUser(loginUserDto: LoginDto): Promise<IUserResponse> {
    //check if user exists
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email, // Find user by email
      },
    });

    if (!user) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    //check if provide correct password
    const matchPassword = await compare(loginUserDto.password, user.password);
    if (!matchPassword) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.generateUserResponse(user);
  }
}
