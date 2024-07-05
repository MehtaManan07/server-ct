import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReadyProductsService } from './ready-products.service';
import { CreateReadyProductDto } from './dto/create-ready-product.dto';

@Controller('ready-products')
export class ReadyProductsController {
  constructor(private readonly readyProductsService: ReadyProductsService) {}

  @Post()
  create(@Body() createReadyProductDto: CreateReadyProductDto) {
    return this.readyProductsService.create(createReadyProductDto);
  }

  @Get()
  findAll() {
    return this.readyProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readyProductsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readyProductsService.remove(+id);
  }
}
