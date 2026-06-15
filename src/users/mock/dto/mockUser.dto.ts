import { IsPositive, IsString, Max, Min } from 'class-validator';

export class MockUser {
  @IsString()
  @Max(3, { message: 'the name must have atleast 3 characters' })
  name: string;

  @IsPositive()
  @Min(1, { message: 'the id must not be lower than 1' })
  @Max(200, { message: 'the id must be not exceed the 200' })
  id: number;

  @IsString()
  @Max(3, { message: 'the name must have atleast 3 characters' })
  email: string;

  @IsString()
  @Max(3, { message: 'the name must have atleast 3 characters' })
  role: string;
}
