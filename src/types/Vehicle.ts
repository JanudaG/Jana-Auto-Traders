// src/types/Vehicle.ts

// This defines what a single car looks like based on DummyJSON's data
export interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
}
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
  discountPercentage: number;
  availabilityStatus: string;
  reviews: Review[];
}

// This defines the structure of the overall API response
export interface VehicleResponse {
  products: Vehicle[];
  total: number;
  skip: number;
  limit: number;
}


