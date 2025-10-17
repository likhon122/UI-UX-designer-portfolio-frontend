// Dynamic API Base URL Configuration
// Change this variable to update the API URL globally across the entire application

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_VERSION = "/api/v1";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    SIGNUP: `${API_VERSION}/auth/sign-up`,
    REGISTER_USER: `${API_VERSION}/auth/register-user`,
    FORGET_PASSWORD: `${API_VERSION}/auth/forget-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
    CHANGE_PASSWORD: `${API_VERSION}/auth/change-password`,
    GET_ACCESS_TOKEN: `${API_VERSION}/auth/access-token`,
    LOGOUT: `${API_VERSION}/auth/logout`
  },

  // User endpoints
  USER: {
    ME: `${API_VERSION}/users/me`,
    ALL: `${API_VERSION}/users`,
    SINGLE: (id: string) => `${API_VERSION}/users/${id}`,
    UPDATE: (id: string) => `${API_VERSION}/users/${id}`
  },

  // Admin endpoints
  ADMIN: {
    CREATE: `${API_VERSION}/admins/create-admin`,
    ALL: `${API_VERSION}/admins`,
    SINGLE: (id: string) => `${API_VERSION}/admins/${id}`,
    CHANGE_POSITION: (id: string) =>
      `${API_VERSION}/admins/change-admin-position/${id}`
  },

  // Customer endpoints
  CUSTOMER: {
    ALL: `${API_VERSION}/customers`,
    SINGLE: (id: string) => `${API_VERSION}/customers/${id}`
  },

  // Category endpoints
  CATEGORY: {
    CREATE: `${API_VERSION}/categories`,
    ALL: `${API_VERSION}/categories`,
    SINGLE: (id: string) =>
      `${API_VERSION}/categories/get-single-category/${id}`,
    UPDATE: (id: string) => `${API_VERSION}/categories/${id}`
  },

  // Design endpoints
  DESIGN: {
    CREATE: `${API_VERSION}/designs`,
    ALL: `${API_VERSION}/designs`,
    SINGLE: (id: string) => `${API_VERSION}/designs/get-single-design/${id}`,
    UPDATE: (id: string) => `${API_VERSION}/designs/${id}`,
    DELETE: (id: string) => `${API_VERSION}/designs/${id}`
  },

  // Pricing Plan endpoints
  PRICING_PLAN: {
    CREATE: `${API_VERSION}/pricing-plans`,
    ALL: `${API_VERSION}/pricing-plans`,
    SINGLE: (id: string) => `${API_VERSION}/pricing-plans/${id}`,
    UPDATE: (id: string) => `${API_VERSION}/pricing-plans/${id}`
  },

  // Purchase endpoints
  PURCHASE: {
    CREATE: `${API_VERSION}/purchase`,
    ALL: `${API_VERSION}/purchase`,
    MY_PURCHASES: `${API_VERSION}/purchase/get-all-my-purchase`,
    SINGLE: (id: string) => `${API_VERSION}/purchase/${id}`,
    UPDATE: (id: string) => `${API_VERSION}/purchase/${id}`,
    REVENUE: `${API_VERSION}/purchase/get-revenue`
  },

  // Review endpoints
  REVIEW: {
    CREATE: `${API_VERSION}/reviews`,
    DESIGN_REVIEWS: (id: string) =>
      `${API_VERSION}/reviews/design-reviews/${id}`,
    SINGLE: (id: string) => `${API_VERSION}/reviews/${id}`,
    DELETE: (id: string) => `${API_VERSION}/reviews/${id}`
  }
} as const;
