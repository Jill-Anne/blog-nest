import { UserEntity } from '@/user/user.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: UserEntity; // The user object will be populated by the AuthMiddleware if the token is valid
}
