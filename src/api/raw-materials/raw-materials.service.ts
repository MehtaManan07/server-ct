import { Injectable } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { LoggerService } from 'src/common/logger';
import { RawMaterial } from './entities/raw-material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class RawMaterialsService {
  constructor(
    private logger: LoggerService,
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
  ) {
    this.logger.setContext(RawMaterialsService.name);
  }

  async create(createRawMaterialDto: CreateRawMaterialDto): Promise<void> {
    await this.rawMaterialRepository.save(createRawMaterialDto);
    return;
  }

  async findAll(name: string): Promise<RawMaterial[]> {
    const materials = await this.rawMaterialRepository.find({
      where: [
        { name: Like(`%${name}%`) },
        { description: Like(`%${name}%`) },
        { category: Like(`%${name}%`) },
      ],
    });
    return materials;
  }

  async findOne(id: number): Promise<RawMaterial> {
    const material = await this.rawMaterialRepository.findOne({
      where: { id },
    });
    return material;
  }

  async update(
    id: number,
    updateRawMaterialDto: UpdateRawMaterialDto,
  ): Promise<RawMaterial> {
    const material = await this.rawMaterialRepository.update(
      id,
      updateRawMaterialDto,
    );
    return material.raw[0];
  }

  async remove(id: number) {
    await this.rawMaterialRepository.update(id, { isDeleted: true });
    return;
  }

  async hardRemove(id: number) {
    await this.rawMaterialRepository.delete(id);
    return;
  }

  async fetchCategoryNames(): Promise<string[]> {
    const categories = await this.rawMaterialRepository
      .createQueryBuilder('rawMaterial')
      .select('DISTINCT(rawMaterial.category)')
      .getRawMany();

    console.log(categories);

    const uniqueCategories = categories.map((item) => item.category);
    return uniqueCategories;
  }
  async findByCategory(category: string): Promise<RawMaterial[]> {
    const materials = await this.rawMaterialRepository.find({
      where: { category: Like(`%${category}%`) },
    });
    return materials;
  }
}
