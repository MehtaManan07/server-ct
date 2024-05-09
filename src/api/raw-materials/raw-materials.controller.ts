import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('raw-materials')
@ApiTags('Raw materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post()
  create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialsService.create(createRawMaterialDto);
  }

  @Get()
  @ApiQuery({ name: 'name', type: String })
  findAll(@Query() params: { name: string }) {
    return this.rawMaterialsService.findAll(params.name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    return this.rawMaterialsService.update(+id, updateRawMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialsService.remove(+id);
  }

  @Delete('/hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.rawMaterialsService.hardRemove(+id);
  }

  @Get('/category/all')
  fetchCategoryNames() {
    return this.rawMaterialsService.fetchCategoryNames();
  }

  @Get('/category/search')
  @ApiQuery({ name: 'category', type: String })
  findByCategory(@Query() params: { category: string }) {
    return this.rawMaterialsService.findByCategory(params.category);
  }
}
