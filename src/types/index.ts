// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  errorDetails?: {
    issues: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

// User Types
export type UserRole = "customer" | "admin" | "superAdmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

// Customer Profile Types
export interface CustomerProfile {
  _id: string;
  user: string;
  name: string;
  phone: string;
  address: string;
  membership: string;
  totalSpent: number;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserData {
  _id: string;
  email: string;
  role: UserRole;
  isDeleted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CurrentUserResponse {
  user: UserData;
  customer?: CustomerProfile;
  admin?: any; // For admin users
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Admin Types
export type AdminPosition = "Administrator" | "Manager";

export interface Admin {
  id: string;
  name: string;
  email: string;
  position: AdminPosition;
  role: "admin";
  phone?: string;
  address?: string;
  profileImage?: string;
  createdAt?: string;
}

export interface CreateAdminData {
  name: string;
  email: string;
  password: string;
  position?: AdminPosition;
  profileImage?: string;
  phone?: string;
  address?: string;
}

// Customer Types
export interface Customer {
  id: string;
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name?: string;
}

// Design Types
export type ComplexityLevel = "Basic" | "Intermediate" | "Advanced";
export type DesignStatus = "Active" | "Draft" | "Archived";

export interface Design {
  _id: string;
  title: string;
  category: string | Category;
  description: string;
  previewImageUrl: string;
  designerName: string;
  usedTools: string[];
  effects?: string[];
  price: number;
  process: string;
  complexityLevel: ComplexityLevel;
  tags?: string[];
  status: DesignStatus;
  likesCount?: number;
  downloadsCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDesignData {
  title: string;
  category: string;
  description: string;
  previewImageUrl: string;
  designerName: string;
  usedTools: string[];
  effects?: string[];
  price: number;
  process: string;
  complexityLevel: ComplexityLevel;
  tags?: string[];
  status?: DesignStatus;
}

export interface UpdateDesignData {
  title?: string;
  category?: string;
  description?: string;
  previewImageUrl?: string;
  designerName?: string;
  usedTools?: string[];
  effects?: string[];
  price?: number;
  process?: string;
  complexityLevel?: ComplexityLevel;
  tags?: string[];
  status?: DesignStatus;
}

// Pricing Plan Types
export type PlanName = "Basic" | "Standard" | "Premium";

export interface PricingPlan {
  id: string;
  name: PlanName;
  price: number;
  features: string[];
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePricingPlanData {
  name: PlanName;
  price: number;
  features: string[];
  duration: number;
}

export interface UpdatePricingPlanData {
  name?: PlanName;
  price?: number;
  features?: string[];
  duration?: number;
}

// Purchase Types
export type PaymentStatus = "Pending" | "Paid" | "Cancelled";

export interface Purchase {
  id: string;
  customer: string | Customer;
  design: string | Design;
  pricingPlan: string | PricingPlan;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePurchaseData {
  design: string;
  pricingPlan: string;
}

export interface UpdatePurchaseData {
  paymentStatus?: PaymentStatus;
  status?: string;
}

export type RevenueData = {
  _id: null;
  totalRevenue: number;
};

// Review Types
export interface Review {
  _id: string;
  reviewer: User;
  design: string;
  rating: number;
  customerDetails: CustomerProfile;
  comment?: string;
  createdAt: string;
}

export interface CreateReviewData {
  design: string;
  rating: number;
  comment?: string;
}
