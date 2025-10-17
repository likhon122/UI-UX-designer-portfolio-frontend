import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import { API_BASE_URL, API_VERSION } from "@/config/api.config";
import type {
  User,
  CurrentUserResponse,
  Design,
  Category,
  PricingPlan,
  Purchase,
  Review,
  Admin,
  ApiResponse,
  PaginatedResponse,
  LoginResponse,
  SignUpData,
  LoginData,
  CreateDesignData,
  UpdateDesignData,
  CreateCategoryData,
  UpdateCategoryData,
  CreatePricingPlanData,
  UpdatePricingPlanData,
  CreatePurchaseData,
  UpdatePurchaseData,
  CreateReviewData,
  RevenueData
} from "@/types";

// Custom base query with token refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include", // Include cookies
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Get the endpoint URL
  const url = typeof args === "string" ? args : args.url;

  // Don't try to refresh token for auth endpoints (login, signup, etc.)
  const isAuthEndpoint =
    url.includes("/auth/login") ||
    url.includes("/auth/sign-up") ||
    url.includes("/auth/register-user") ||
    url.includes("/auth/forget-password") ||
    url.includes("/auth/reset-password");

  if (result.error && result.error.status === 401 && !isAuthEndpoint) {
    // Try to refresh the token only for non-auth endpoints
    const refreshResult = await baseQuery(
      `${API_VERSION}/auth/access-token`,
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as ApiResponse<{ accessToken: string }>;
      // Store new token
      localStorage.setItem("accessToken", data.data.accessToken);
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // Don't use window.location.href as it causes full page reload
      // Let the component handle navigation
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Design",
    "Category",
    "PricingPlan",
    "Purchase",
    "Review",
    "Admin",
    "Customer",
    "User"
  ],
  endpoints: (builder) => ({
    // ==================== AUTH ENDPOINTS ====================
    signUp: builder.mutation<ApiResponse<{ message: string }>, SignUpData>({
      query: (data) => ({
        url: `${API_VERSION}/auth/sign-up`,
        method: "POST",
        body: data
      })
    }),

    registerUser: builder.mutation<
      ApiResponse<LoginResponse>,
      { token: string }
    >({
      query: ({ token }) => ({
        url: `${API_VERSION}/auth/register-user`,
        method: "POST",
        body: { token }
      }),
      invalidatesTags: ["Auth"]
    }),

    login: builder.mutation<ApiResponse<LoginResponse>, LoginData>({
      query: (data) => ({
        url: `${API_VERSION}/auth/login`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Auth"]
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: `${API_VERSION}/auth/logout`,
        method: "POST"
      }),
      invalidatesTags: ["Auth"]
    }),

    forgetPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { email: string }
    >({
      query: (data) => ({
        url: `${API_VERSION}/auth/forget-password`,
        method: "POST",
        body: data
      })
    }),

    resetPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { token: string; changedPassword: string }
    >({
      query: ({ token, changedPassword }) => ({
        url: `${API_VERSION}/auth/reset-password`,
        method: "POST",
        headers: {
          Authorization: token
        },
        body: { changedPassword }
      })
    }),

    changePassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: `${API_VERSION}/auth/change-password`,
        method: "PATCH",
        body: data
      })
    }),

    // ==================== USER ENDPOINTS ====================
    getCurrentUser: builder.query<ApiResponse<CurrentUserResponse>, void>({
      query: () => `${API_VERSION}/users/me`,
      providesTags: ["User"]
    }),

    updateUser: builder.mutation<
      ApiResponse<User>,
      { id: string } & Partial<User>
    >({
      query: ({ id, ...data }) => ({
        url: `${API_VERSION}/users/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["User"]
    }),

    // ==================== DESIGN ENDPOINTS ====================
    getDesigns: builder.query<
      ApiResponse<PaginatedResponse<Design>>,
      { page?: number; limit?: number; category?: string; search?: string }
    >({
      query: ({ page = 1, limit = 12, category, search }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString()
        });
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        return `${API_VERSION}/designs?${params.toString()}`;
      },
      providesTags: ["Design"]
    }),

    getDesignById: builder.query<ApiResponse<Design>, string>({
      query: (id) => `${API_VERSION}/designs/get-single-design/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Design", id }]
    }),

    createDesign: builder.mutation<ApiResponse<Design>, CreateDesignData>({
      query: (data) => ({
        url: `${API_VERSION}/designs`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Design"]
    }),

    updateDesign: builder.mutation<
      ApiResponse<Design>,
      { id: string; data: UpdateDesignData }
    >({
      query: ({ id, data }) => ({
        url: `${API_VERSION}/designs/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Design", id },
        "Design"
      ]
    }),

    deleteDesign: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `${API_VERSION}/admin/designs/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Design"]
    }),

    // ==================== CATEGORY ENDPOINTS ====================
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => `${API_VERSION}/categories`,
      providesTags: ["Category"]
    }),

    getCategoryById: builder.query<ApiResponse<Category>, string>({
      query: (id) => `${API_VERSION}/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }]
    }),

    createCategory: builder.mutation<ApiResponse<Category>, CreateCategoryData>(
      {
        query: (data) => ({
          url: `${API_VERSION}/categories`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ["Category"]
      }
    ),

    updateCategory: builder.mutation<
      ApiResponse<Category>,
      { id: string; data: UpdateCategoryData }
    >({
      query: ({ id, data }) => ({
        url: `${API_VERSION}/categories/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Category"]
    }),

    // ==================== PRICING PLAN ENDPOINTS ====================
    getPricingPlans: builder.query<ApiResponse<PricingPlan[]>, void>({
      query: () => `${API_VERSION}/pricing-plans`,
      providesTags: ["PricingPlan"]
    }),

    getPricingPlanById: builder.query<ApiResponse<PricingPlan>, string>({
      query: (id) => `${API_VERSION}/pricing-plans/${id}`,
      providesTags: (_result, _error, id) => [{ type: "PricingPlan", id }]
    }),

    createPricingPlan: builder.mutation<
      ApiResponse<PricingPlan>,
      CreatePricingPlanData
    >({
      query: (data) => ({
        url: `${API_VERSION}/pricing-plans`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["PricingPlan"]
    }),

    updatePricingPlan: builder.mutation<
      ApiResponse<PricingPlan>,
      { id: string; data: UpdatePricingPlanData }
    >({
      query: ({ id, data }) => ({
        url: `${API_VERSION}/pricing-plans/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["PricingPlan"]
    }),

    // ==================== PURCHASE ENDPOINTS ====================
    createPurchase: builder.mutation<ApiResponse<Purchase>, CreatePurchaseData>(
      {
        query: (data) => ({
          url: `${API_VERSION}/purchase`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ["Purchase"]
      }
    ),

    getMyPurchases: builder.query<ApiResponse<Purchase[]>, void>({
      query: () => `${API_VERSION}/purchase/get-all-my-purchase`,
      providesTags: ["Purchase"]
    }),

    getAllPurchases: builder.query<
      ApiResponse<PaginatedResponse<Purchase>>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) =>
        `${API_VERSION}/purchase?page=${page}&limit=${limit}`,
      providesTags: ["Purchase"]
    }),

    getPurchaseById: builder.query<ApiResponse<Purchase>, string>({
      query: (id) => `${API_VERSION}/purchase/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Purchase", id }]
    }),

    updatePurchase: builder.mutation<
      ApiResponse<Purchase>,
      { id: string; data: UpdatePurchaseData }
    >({
      query: ({ id, data }) => ({
        url: `${API_VERSION}/purchase/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Purchase"]
    }),

    getRevenue: builder.query<ApiResponse<RevenueData[]>, void>({
      query: () => `${API_VERSION}/purchase/get-revenue`
    }),

    // ==================== REVIEW ENDPOINTS ====================
    createReview: builder.mutation<ApiResponse<Review>, CreateReviewData>({
      query: (data) => ({
        url: `${API_VERSION}/reviews`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Review", "Design"]
    }),

    getDesignReviews: builder.query<ApiResponse<Review[]>, string>({
      query: (designId) => `${API_VERSION}/reviews/design-reviews/${designId}`,
      providesTags: (_result, _error, designId) => [
        { type: "Review", id: designId }
      ]
    }),

    getReviewById: builder.query<ApiResponse<Review>, string>({
      query: (id) => `${API_VERSION}/reviews/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Review", id }]
    }),

    deleteReview: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `${API_VERSION}/reviews/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Review", "Design"]
    }),

    // ==================== ADMIN ENDPOINTS ====================
    getAdmins: builder.query<ApiResponse<Admin[]>, void>({
      query: () => `${API_VERSION}/admins`,
      providesTags: ["Admin"]
    }),

    createAdmin: builder.mutation<
      ApiResponse<Admin>,
      { name: string; email: string; password: string; position: string }
    >({
      query: (data) => ({
        url: `${API_VERSION}/admins/create-admin`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Admin"]
    }),

    changeAdminPosition: builder.mutation<
      ApiResponse<Admin>,
      { id: string; position: string }
    >({
      query: ({ id, position }) => ({
        url: `${API_VERSION}/admins/change-admin-position/${id}`,
        method: "PATCH",
        body: { position }
      }),
      invalidatesTags: ["Admin"]
    }),

    // ==================== CUSTOMER ENDPOINTS ====================
    getCustomers: builder.query<
      ApiResponse<PaginatedResponse<User>>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) =>
        `${API_VERSION}/customers?page=${page}&limit=${limit}`,
      providesTags: ["Customer"]
    })
  })
});

export const {
  // Auth
  useSignUpMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,

  // User
  useGetCurrentUserQuery,
  useUpdateUserMutation,

  // Design
  useGetDesignsQuery,
  useGetDesignByIdQuery,
  useCreateDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation,

  // Category
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,

  // Pricing Plan
  useGetPricingPlansQuery,
  useGetPricingPlanByIdQuery,
  useCreatePricingPlanMutation,
  useUpdatePricingPlanMutation,

  // Purchase
  useCreatePurchaseMutation,
  useGetMyPurchasesQuery,
  useGetAllPurchasesQuery,
  useGetPurchaseByIdQuery,
  useUpdatePurchaseMutation,
  useGetRevenueQuery,

  // Review
  useCreateReviewMutation,
  useGetDesignReviewsQuery,
  useGetReviewByIdQuery,
  useDeleteReviewMutation,

  // Admin
  useGetAdminsQuery,
  useCreateAdminMutation,
  useChangeAdminPositionMutation,

  // Customer
  useGetCustomersQuery
} = api;
