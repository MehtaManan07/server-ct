import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { LoggerService } from 'src/common/logger';
import { RawMaterial } from './entities/raw-material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ArrayContains,
  EntityManager,
  Like,
  ObjectLiteral,
  Repository,
} from 'typeorm';

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
    const { categories, name, packetsAvailable, size, unit, weightPerUnit } =
      createRawMaterialDto;
    const totalWeight = packetsAvailable * weightPerUnit;
    await this.rawMaterialRepository.save({
      totalWeight,
      categories,
      name,
      size,
      unit,
      packetsAvailable,
      weightPerUnit,
    });
    return;
  }

  async createBulk(
    createRawMaterialDto: CreateRawMaterialDto[],
  ): Promise<ObjectLiteral[]> {
    const result = await this.rawMaterialRepository
      .createQueryBuilder()
      .insert()
      .values(createRawMaterialDto)
      .execute();
    return result.identifiers;
  }

  async findAll(name: string): Promise<RawMaterial[]> {
    const queryName = name.toLocaleLowerCase();
    const materials = await this.rawMaterialRepository.find({
      where: [
        { name: Like(`%${queryName}%`) },
        { categories: ArrayContains([queryName]) },
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
  async fetchCategoryCounts(): Promise<
    { category: string; count: number; names: string[] }[]
  > {
    const categoryCounts = await this.rawMaterialRepository
      .createQueryBuilder('rawMaterial')
      .select('unnest(rawMaterial.categories)', 'category')
      .addSelect('COUNT(*)', 'count')
      .addSelect('array_agg(rawMaterial.name)', 'names')
      .groupBy('category')
      .getRawMany();

    return categoryCounts.map((item) => ({
      category: item.category,
      count: parseInt(item.count, 10),
      names: item.names,
    }));
  }

  async findByCategory(category: string): Promise<RawMaterial[]> {
    const materials = await this.rawMaterialRepository.find({
      where: { categories: ArrayContains([category]) },
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
      if (!material || material.totalWeight < quantityUsed) {
        throw new NotFoundException(
          `Material with ID ${materialId} is not available in sufficient quantity.`,
        );
      }
    }
  }
}
