import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role, User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Step 1: Fetch a user with the given username
    const user = await this.userRepository.findOne({
      where: { username, isDeleted: false },
      select: ['password'],
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: 'sasa', role: 'asdsdsa' }),
    };
  }

  async signup(data: CreateUserDto): Promise<{ accessToken: string }> {
    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
      isDeleted: false,
    });
    return {
      accessToken: this.jwtService.sign({ userId: user.id, role: user.role }),
    };
  }

  /**
   * only for dev use
   */
  async getToken(params: { userId: number; role: Role }): Promise<string> {
    return this.jwtService.sign({ userId: params.userId, role: params.role });
  }
}
