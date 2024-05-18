import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class RawMaterialDto {
  @IsNotEmpty()
  @IsNumber()
  materialId: number;

  @IsNotEmpty()
  @IsNumber()
  quantityUsed: number;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  jobberId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RawMaterialDto)
  rawMaterialQuantities: RawMaterialDto[];
}
