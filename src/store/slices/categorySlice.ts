import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api.config";
import {
  Category,
  CreateCategoryData,
  ApiResponse,
  PaginatedResponse
} from "@/types";

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Category>>
    >(API_ENDPOINTS.CATEGORY.ALL);
    return response.data.data.items;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORY.SINGLE(id)
    );
    return response.data.data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (data: CreateCategoryData) => {
    const response = await axiosInstance.post<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORY.CREATE,
      data
    );
    return response.data.data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }: { id: string; data: CreateCategoryData }) => {
    const response = await axiosInstance.patch<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORY.UPDATE(id),
      data
    );
    return response.data.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  }
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
