import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRawMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsArray({ always: true })
  @IsNotEmpty()
  categories: string[];

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @IsNotEmpty()
  packetsAvailable: number;

  @IsNumber()
  @IsNotEmpty()
  weightPerUnit: number;

  @IsNumber()
  totalWeight?: number;
}

export class CreateRawMaterialBulkDto {
  @IsNotEmpty()
  data: CreateRawMaterialDto[];
}
