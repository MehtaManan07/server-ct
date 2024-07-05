import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateReadyProductDto {
  @IsNotEmpty()
  @IsString()
  shape: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsInt()
  taskId: number;
}
