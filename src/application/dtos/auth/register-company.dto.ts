import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  password: string;
}
