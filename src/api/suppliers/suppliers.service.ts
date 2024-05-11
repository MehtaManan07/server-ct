import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { LoggerService } from 'src/common/logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    private logger: LoggerService,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto): Promise<void> {
    await this.supplierRepository.save(createSupplierDto);
    return;
  }
  async findAll(): Promise<Supplier[]> {
    const users = await this.supplierRepository.find();
    return users;
  }

  async findOne(id: number): Promise<Supplier> {
    const userDoc = await this.supplierRepository.findOne({ where: { id } });
    if (!userDoc) throw new NotFoundException('User not found by id: ' + id);
    return userDoc;
  }

  async update(id: number, updateUserDto: UpdateSupplierDto) {
    const { name } = updateUserDto;

    const userDoc = await this.supplierRepository.update({ id }, { name });

    return userDoc.raw[0];
  }

  async remove(id: number) {
    await this.supplierRepository.update({ id }, { isDeleted: true });
  }
}
