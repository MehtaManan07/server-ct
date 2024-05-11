import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/api/users/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name is too short' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role, { message: 'Invalid role' })
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;
}
