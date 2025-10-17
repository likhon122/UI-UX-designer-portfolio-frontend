import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api.config";
import {
  Purchase,
  CreatePurchaseData,
  RevenueData,
  ApiResponse,
  PaginatedResponse
} from "@/types";

interface PurchaseState {
  purchases: Purchase[];
  myPurchases: Purchase[];
  currentPurchase: Purchase | null;
  revenue: RevenueData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PurchaseState = {
  purchases: [],
  myPurchases: [],
  currentPurchase: null,
  revenue: null,
  loading: false,
  error: null
};

// Async thunks
export const createPurchase = createAsyncThunk(
  "purchases/create",
  async (data: CreatePurchaseData) => {
    const response = await axiosInstance.post<ApiResponse<Purchase>>(
      API_ENDPOINTS.PURCHASE.CREATE,
      data
    );
    return response.data.data;
  }
);

export const fetchMyPurchases = createAsyncThunk(
  "purchases/fetchMy",
  async () => {
    const response = await axiosInstance.get<ApiResponse<Purchase[]>>(
      API_ENDPOINTS.PURCHASE.MY_PURCHASES
    );
    return response.data.data;
  }
);

export const fetchAllPurchases = createAsyncThunk(
  "purchases/fetchAll",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
    const response = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Purchase>>
    >(API_ENDPOINTS.PURCHASE.ALL, { params: { page, limit } });
    return response.data.data;
  }
);

export const fetchPurchaseById = createAsyncThunk(
  "purchases/fetchById",
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Purchase>>(
      API_ENDPOINTS.PURCHASE.SINGLE(id)
    );
    return response.data.data;
  }
);

export const updatePurchase = createAsyncThunk(
  "purchases/update",
  async ({
    id,
    paymentStatus
  }: {
    id: string;
    paymentStatus: "Paid" | "Cancelled";
  }) => {
    const response = await axiosInstance.patch<ApiResponse<Purchase>>(
      API_ENDPOINTS.PURCHASE.UPDATE(id),
      { paymentStatus }
    );
    return response.data.data;
  }
);

export const fetchRevenue = createAsyncThunk(
  "purchases/fetchRevenue",
  async () => {
    const response = await axiosInstance.get<ApiResponse<RevenueData>>(
      API_ENDPOINTS.PURCHASE.REVENUE
    );
    return response.data.data;
  }
);

const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.myPurchases.unshift(action.payload);
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create purchase";
      })

      .addCase(fetchMyPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.myPurchases = action.payload;
      })
      .addCase(fetchMyPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch purchases";
      })

      .addCase(fetchAllPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload.items;
      })
      .addCase(fetchAllPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch purchases";
      })

      .addCase(fetchPurchaseById.fulfilled, (state, action) => {
        state.currentPurchase = action.payload;
      })

      .addCase(updatePurchase.fulfilled, (state, action) => {
        const index = state.purchases.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.purchases[index] = action.payload;
        }
      })

      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload;
      });
  }
});

export const { clearError } = purchaseSlice.actions;
export default purchaseSlice.reducer;
