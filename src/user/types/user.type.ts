import { UserEntity } from '@/user/user.entity';

export type IUser = Omit<UserEntity, 'hashPassword'>;
//Create a new type called IUser, which is the same as UserEntity but without the hashPassword method