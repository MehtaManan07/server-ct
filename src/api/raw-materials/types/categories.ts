export interface Category {
  categories: string[];
  materials: CategoryMaterial[];
}

export interface CategoryMaterial {
  materialId: number;
  name: string;
  packetsAvailable: number;
  unit: string;
  size: number;
  weightPerUnit: number;
  totalWeight: number;
}

export interface RawMaterial {
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  name: string;
  packetsAvailable: number;
  unit: string;
  size: number;
  color: string;
  slug: string;
  categories: string[];
  weightPerUnit: number;
  totalWeight: number;
}
