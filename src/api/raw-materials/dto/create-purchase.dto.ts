import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseDTO {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  supplier: string;

  @IsOptional()
  @IsString()
  invoiceNumber: string;

  @IsOptional()
  @IsString()
  notes: string;

  @IsNotEmpty()
  @IsNumber()
  rawMaterialId: number;
}
