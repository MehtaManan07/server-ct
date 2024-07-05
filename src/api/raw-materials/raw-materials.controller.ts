import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/create-category.dto';
import {
  CreateRawMaterialBulkDto,
  CreateRawMaterialDto,
} from './dto/create-raw-material.dto';

import { RawMaterialsService } from './raw-materials.service';
import { CreatePurchaseDTO } from './dto/create-purchase.dto';

@Controller('raw-materials')
@ApiTags('Raw materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post('/category')
  createParentCategory(@Body() body: CreateCategoryDto) {
    return this.rawMaterialsService.createParentCategory(body.name);
  }

  @Post()
  create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialsService.create(createRawMaterialDto);
  }

  @Get('/purchase/records')
  findAllPurchaseRecords() {
    return this.rawMaterialsService.findAllPurchaseRecords();
  }

  @Post('/purchase/record')
  createPurchase(@Body() createPurchaseDto: CreatePurchaseDTO) {
    return this.rawMaterialsService.createPurchaseRecord(createPurchaseDto);
  }

  @Post('/bulk')
  createBulk(@Body() createRawMaterialDto: CreateRawMaterialBulkDto) {
    return this.rawMaterialsService.createBulk(createRawMaterialDto.data);
  }

  @Get()
  @ApiQuery({ name: 'name', type: String, allowEmptyValue: true })
  findAll(@Query() params: { name: string }) {
    return this.rawMaterialsService.findAll(params.name ?? '');
  }

  @Get('/category')
  @ApiQuery({ name: 'name', type: String, allowEmptyValue: true })
  findAllCategories(@Query() params: { name: string }) {
    return this.rawMaterialsService.findAllCategories(params.name ?? '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialsService.remove(+id);
  }

  @Delete('/hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.rawMaterialsService.hardRemove(+id);
  }

  @Get('/category/search')
  @ApiQuery({ name: 'category', type: String })
  findByCategory(@Query() params: { category: string }) {
    return this.rawMaterialsService.findByCategory(params.category);
  }
}
