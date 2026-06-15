import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsPositive()
  @Min(1, { message: 'the age must not be lower than 1' })
  @Max(200, { message: 'the age must be not exceed the 200' })
  int: number;

  @IsString()
  @IsEnum(['Admin', 'Manager', 'Developer', 'User'], {
    message: 'Please provide the required enum',
  })
  role: 'Admin' | 'Manager' | 'Developer' | 'User';
}
