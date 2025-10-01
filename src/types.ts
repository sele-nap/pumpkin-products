export type Product = {
  id: string;
  name: string;
  variety?: string | null;
  color?: string | null;
  weightKg?: number | null;
  priceEUR?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;