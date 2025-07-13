import { IUser } from '@/user/types/user.type';

//Return an object with a user key, whose value is the user object (IUser) plus a token (JWT string).
export interface IUserResponse {
  user: IUser & { token: string };
}
