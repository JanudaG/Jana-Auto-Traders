// src/types/Vehicle.ts

// This defines what a single car looks like based on DummyJSON's data
export interface Vehicle {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  stock: number;
  rating: number;
}

// This defines the structure of the overall API response
export interface VehicleResponse {
  products: Vehicle[];
  total: number;
  skip: number;
  limit: number;
}


