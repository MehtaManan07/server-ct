import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRawMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsArray({ always: true })
  @IsNotEmpty()
  categories: string[];

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  packetsAvailable: number;

  @IsNumber()
  @IsNotEmpty()
  weightPerUnit: number;

  @IsString()
  @IsNotEmpty()
  parentCategory: string;

  @IsNumber()
  @IsOptional()
  totalWeight?: number;
}

export class CreateRawMaterialBulkDto {
  @IsNotEmpty()
  data: CreateRawMaterialDto[];
}
