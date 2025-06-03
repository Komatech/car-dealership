export interface ICar {
  brand: string;
  carModel: string;
  year: number;
  price: number;
  mileage?: number;
  available: boolean;
  imageUrl?: [string];
  category: string;
}
