import { IsString, IsEmail } from 'class-validator';

export class SigninDto {
  @IsString()
  usernameOrEmail: string;

  @IsString()
  password: string;
}
