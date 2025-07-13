import { UserEntity } from '@/user/user.entity';

//Create a new type called IUser, which is the same as UserEntity but without the hashPassword method
export type IUser = Omit<UserEntity, 'hashPassword'>;
