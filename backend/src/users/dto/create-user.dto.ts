import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 15)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 12)
  password: string;
}
