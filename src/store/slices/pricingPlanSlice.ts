import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api.config";
import { PricingPlan, CreatePricingPlanData, ApiResponse } from "@/types";

interface PricingPlanState {
  plans: PricingPlan[];
  currentPlan: PricingPlan | null;
  loading: boolean;
  error: string | null;
}

const initialState: PricingPlanState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null
};

// Async thunks
export const fetchPricingPlans = createAsyncThunk(
  "pricingPlans/fetchAll",
  async () => {
    const response = await axiosInstance.get<ApiResponse<PricingPlan[]>>(
      API_ENDPOINTS.PRICING_PLAN.ALL
    );
    return response.data.data;
  }
);

export const fetchPricingPlanById = createAsyncThunk(
  "pricingPlans/fetchById",
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<PricingPlan>>(
      API_ENDPOINTS.PRICING_PLAN.SINGLE(id)
    );
    return response.data.data;
  }
);

export const createPricingPlan = createAsyncThunk(
  "pricingPlans/create",
  async (data: CreatePricingPlanData) => {
    const response = await axiosInstance.post<ApiResponse<PricingPlan>>(
      API_ENDPOINTS.PRICING_PLAN.CREATE,
      data
    );
    return response.data.data;
  }
);

export const updatePricingPlan = createAsyncThunk(
  "pricingPlans/update",
  async ({
    id,
    data
  }: {
    id: string;
    data: Partial<CreatePricingPlanData>;
  }) => {
    const response = await axiosInstance.patch<ApiResponse<PricingPlan>>(
      API_ENDPOINTS.PRICING_PLAN.UPDATE(id),
      data
    );
    return response.data.data;
  }
);

const pricingPlanSlice = createSlice({
  name: "pricingPlans",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPricingPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPricingPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pricing plans";
      })

      .addCase(fetchPricingPlanById.fulfilled, (state, action) => {
        state.currentPlan = action.payload;
      })

      .addCase(createPricingPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })

      .addCase(updatePricingPlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
      });
  }
});

export const { clearError } = pricingPlanSlice.actions;
export default pricingPlanSlice.reducer;
