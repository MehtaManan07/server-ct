import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
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
import { Category as CategoryEntity } from './entities/category.entity';
import { PurchaseRecord } from './entities/raw-material-purchase.entity';
import { CreatePurchaseDTO } from './dto/create-purchase.dto';

@Injectable()
export class RawMaterialsService {
  constructor(
    private logger: LoggerService,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(PurchaseRecord)
    private readonly purchaseRecordRepository: Repository<PurchaseRecord>,
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
  ) {
    this.logger.setContext(RawMaterialsService.name);
  }

  async createParentCategory(name: string): Promise<void> {
    await this.categoryRepository.save({ name });
    return;
  }

  async create(createRawMaterialDto: CreateRawMaterialDto): Promise<void> {
    const {
      categories,
      name,
      packetsAvailable,
      size,
      weightPerUnit,
      color,
      parentCategory: _parentCategory,
      totalWeight: _totalWeight,
    } = createRawMaterialDto;
    let totalWeight = _totalWeight;
    if (!totalWeight) {
      totalWeight = packetsAvailable * weightPerUnit;
    }
    const category = await this.categoryRepository.findOne({
      where: { name: _parentCategory },
    });

    const slug = `${name}-${size}`;
    await this.rawMaterialRepository.save({
      totalWeight,
      color,
      slug,
      categories,
      name,
      size,
      packetsAvailable,
      weightPerUnit,
      parentCategory: category,
    });
    return;
  }

  async createBulk(
    createRawMaterialDto: CreateRawMaterialDto[],
  ): Promise<ObjectLiteral[]> {
    const t1 = performance.now();
    const data = await Promise.all(
      createRawMaterialDto.map(async (item) => {
        const {
          categories,
          name,
          packetsAvailable,
          size,
          weightPerUnit,
          color,
          parentCategory,
          totalWeight: _totalWeight,
        } = item;
        let totalWeight = _totalWeight;
        if (!totalWeight) {
          totalWeight = packetsAvailable * weightPerUnit;
        }

        const category = await this.categoryRepository.findOne({
          where: { name: parentCategory },
        });

        const slug = `${name.split(' ').join('-')}-${size}`;
        return {
          totalWeight,
          color,
          slug,
          categories,
          name,
          size,
          packetsAvailable,
          weightPerUnit,
          parentCategory: category,
        };
      }),
    );
    const result = await this.rawMaterialRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();

    const t2 = performance.now();
    this.logger.log(`Bulk insert took ${t2 - t1} milliseconds.`);
    return result.identifiers;
  }

  async createPurchaseRecord(
    createPurchaseRecordDto: CreatePurchaseDTO,
  ): Promise<void> {
    const { rawMaterialId } = createPurchaseRecordDto;
    const rawMaterial = await this.rawMaterialRepository.findOne({
      where: { id: rawMaterialId },
    });
    if (!rawMaterial) {
      throw new NotFoundException(
        `Raw material with ID ${rawMaterialId} not found.`,
      );
    }
    await this.purchaseRecordRepository.save({
      invoiceNumber: createPurchaseRecordDto.invoiceNumber,
      notes: createPurchaseRecordDto.notes,
      purchaseDate: new Date(),
      quantity: createPurchaseRecordDto.quantity,
      unitWeight: rawMaterial.weightPerUnit,
      rawMaterialId,
      supplier: createPurchaseRecordDto.supplier,
      totalPrice: createPurchaseRecordDto.totalPrice,
      unitPrice: createPurchaseRecordDto.unitPrice,
    });
    await this.rawMaterialRepository.update(rawMaterialId, {
      totalWeight:
        rawMaterial.totalWeight +
        createPurchaseRecordDto.quantity * rawMaterial.weightPerUnit,
      packetsAvailable:
        rawMaterial.packetsAvailable + createPurchaseRecordDto.quantity,
    });
    return;
  }

  async findAllPurchaseRecords(): Promise<PurchaseRecord[]> {
    const records = await this.purchaseRecordRepository.find();
    return records;
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

  async findAllCategories(name: string): Promise<CategoryEntity[]> {
    const queryName = name.toLocaleLowerCase();
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.rawMaterials', 'rawMaterials')
      .where('LOWER(category.name) LIKE :name', { name: `%${queryName}%` })
      .getMany();
    return categories;
  }

  async findOne(id: number): Promise<RawMaterial> {
    const material = await this.rawMaterialRepository.findOne({
      where: { id },
    });
    return material;
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
