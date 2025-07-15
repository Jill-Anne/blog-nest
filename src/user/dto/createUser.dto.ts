import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  readonly username!: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  readonly email!: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  readonly password!: string;
}
