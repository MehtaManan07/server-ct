import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/common/logger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private logger: LoggerService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.logger.setContext(UsersService.name);
  }
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const userDoc = await this.userRepository.findOne({ where: { id } });
    if (!userDoc) throw new NotFoundException('User not found by id: ' + id);
    return userDoc;
  }

  async findMe(id: number): Promise<User> {
    const userDoc = await this.userRepository.findOne({
      where: { id },
    });
    if (!userDoc) throw new NotFoundException('User not found by id: ' + id);
    return userDoc;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name } = updateUserDto;

    const userDoc = await this.userRepository.update({ id }, { name });

    return userDoc.raw[0];
  }

  async remove(id: number) {
    await this.userRepository.update({ id }, { isDeleted: true });
  }
}
