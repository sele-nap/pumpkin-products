export type User = { id: string; email: string };
export type Product = {
  _id?: string;
  name: string;
  variety?: string;
  color?: string;
  weightKg?: number;
  priceEUR?: number;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};