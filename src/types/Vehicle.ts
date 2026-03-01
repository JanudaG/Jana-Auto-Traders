// src/types/Vehicle.ts

// This defines what a single car looks like based on DummyJSON's data
export interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
}
// This defines the structure of a single vehicle object
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
  weight?: number
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  minimumOrderQuantity?: number
  tags?: string[]
}

// This defines the structure of the overall API response
export interface VehicleResponse {
  products: Vehicle[];
  total: number;
  skip: number;
  limit: number;
}
// This defines the structure of the authenticated user object
export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken: string
}
// This defines the structure of the login credentials
export interface LoginCredentials {
  username: string
  password: string
}
// This defines the structure of a cart item
export interface CartItem {
  vehicle: Vehicle
  quantity: number
}



