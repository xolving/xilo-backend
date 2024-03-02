import { IsString, IsEmail } from 'class-validator';

export class SigninDto {
  @IsString()
  key: string;

  @IsString()
  password: string;
}
