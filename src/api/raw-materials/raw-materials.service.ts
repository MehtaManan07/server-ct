import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { LoggerService } from 'src/common/logger';
import { RawMaterial } from './entities/raw-material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Repository } from 'typeorm';

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
    await this.rawMaterialRepository.save({
      ...createRawMaterialDto,
      isDeleted: false,
    });
    return;
  }

  async createBulk(createRawMaterialDto: CreateRawMaterialDto[]) {
    const result = await this.rawMaterialRepository
      .createQueryBuilder()
      .insert()
      .values(createRawMaterialDto)
      .execute();
    return result;
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

  async updateMaterialsQuantities(
    entityManager: EntityManager,
    rawMaterials: { materialId: number; quantityUsed: number }[],
  ) {
    for (const { materialId, quantityUsed } of rawMaterials) {
      await entityManager.decrement(
        'RawMaterial',
        { id: materialId },
        'quantity',
        quantityUsed,
      );
    }
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

    const uniqueCategories = categories.map((item) => item.category);
    return uniqueCategories;
  }
  async findByCategory(category: string): Promise<RawMaterial[]> {
    const materials = await this.rawMaterialRepository.find({
      where: { category: Like(`%${category}%`) },
    });
    return materials;
  }

  async checkMaterialsAvailability(
    rawMaterials: { materialId: number; quantityUsed: number }[],
  ) {
    // Check if all raw materials are available
    for (const { materialId, quantityUsed } of rawMaterials) {
      const material = await this.rawMaterialRepository.findOne({
        where: { id: materialId },
      });
      if (!material || material.quantity < quantityUsed) {
        throw new NotFoundException(
          `Material with ID ${materialId} is not available in sufficient quantity.`,
        );
      }
    }
  }
}
