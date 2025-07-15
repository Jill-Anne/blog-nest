import { AuthRequest } from '@/types/expressRequest.interface';
import { UserService } from '@/user/user.service';
import { Injectable, NestMiddleware, Request } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Response } from 'express';

import * as dotenv from 'dotenv';
import { UserEntity } from '@/user/user.entity';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = new UserEntity();
      return;
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      const decode = verify(token, process.env.JWT_SECRET);

      if (typeof decode === 'object' && 'id' in decode) {
        const user = await this.userService.findById((decode as JwtPayload).id);
        req.user = user;
      } else {
        req.user = new UserEntity();
      }

      next();
    } catch (err) {
      req.user = new UserEntity(); 
      next();
    }
  }
}
