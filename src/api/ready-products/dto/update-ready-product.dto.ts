import { PartialType } from '@nestjs/mapped-types';
import { CreateReadyProductDto } from './create-ready-product.dto';

export class UpdateReadyProductDto extends PartialType(CreateReadyProductDto) {}
