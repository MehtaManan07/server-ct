import { Injectable } from '@nestjs/common';
import { CreateReadyProductDto } from './dto/create-ready-product.dto';
import { LoggerService } from 'src/common/logger';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadyProduct } from './entities/ready-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReadyProductsService {
  constructor(
    private logger: LoggerService,
    @InjectRepository(ReadyProduct)
    private readonly readyProductRepository: Repository<ReadyProduct>,
  ) {
    this.logger.setContext(ReadyProductsService.name);
  }
  async create(createReadyProductDto: CreateReadyProductDto) {
    const { color, imageUrl, quantity, shape, size, taskId } =
      createReadyProductDto;
    const slug = `${shape}-${size}-${color}`;
    await this.readyProductRepository.save({
      color,
      imageUrl,
      quantity,
      shape,
      size,
      slug,
      taskId,
    });
  }

  async findAll(): Promise<ReadyProduct[]> {
    const readyProducts = await this.readyProductRepository.find();
    return readyProducts;
  }

  async findOne(id: number): Promise<ReadyProduct> {
    const readyProduct = this.readyProductRepository.findOne({ where: { id } });
    if (!readyProduct) {
      throw new Error('Ready Product not found');
    }
    return readyProduct;
  }

  async remove(id: number) {
    await this.readyProductRepository.update(id, { isDeleted: true });
    return;
  }
}
