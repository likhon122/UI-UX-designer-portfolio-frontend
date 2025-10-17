import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api.config";
import {
  Design,
  CreateDesignData,
  ApiResponse,
  PaginatedResponse
} from "@/types";

interface DesignState {
  designs: Design[];
  currentDesign: Design | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: DesignState = {
  designs: [],
  currentDesign: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

// Async thunks
export const fetchDesigns = createAsyncThunk(
  "designs/fetchAll",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
    const response = await axiosInstance.get<
      ApiResponse<PaginatedResponse<Design>>
    >(API_ENDPOINTS.DESIGN.ALL, { params: { page, limit } });
    return response.data.data;
  }
);

export const fetchDesignById = createAsyncThunk(
  "designs/fetchById",
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Design>>(
      API_ENDPOINTS.DESIGN.SINGLE(id)
    );
    return response.data.data;
  }
);

export const createDesign = createAsyncThunk(
  "designs/create",
  async (data: CreateDesignData) => {
    const response = await axiosInstance.post<ApiResponse<Design>>(
      API_ENDPOINTS.DESIGN.CREATE,
      data
    );
    return response.data.data;
  }
);

export const updateDesign = createAsyncThunk(
  "designs/update",
  async ({ id, data }: { id: string; data: Partial<CreateDesignData> }) => {
    const response = await axiosInstance.patch<ApiResponse<Design>>(
      API_ENDPOINTS.DESIGN.UPDATE(id),
      data
    );
    return response.data.data;
  }
);

export const deleteDesign = createAsyncThunk(
  "designs/delete",
  async (id: string) => {
    await axiosInstance.delete(API_ENDPOINTS.DESIGN.DELETE(id));
    return id;
  }
);

const designSlice = createSlice({
  name: "designs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDesign: (state) => {
      state.currentDesign = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all designs
      .addCase(fetchDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch designs";
      })

      // Fetch single design
      .addCase(fetchDesignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDesign = action.payload;
      })
      .addCase(fetchDesignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch design";
      })

      // Create design
      .addCase(createDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.designs.unshift(action.payload);
      })
      .addCase(createDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create design";
      })

      // Update design
      .addCase(updateDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDesign.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.designs.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.designs[index] = action.payload;
        }
        if (state.currentDesign?._id === action.payload._id) {
          state.currentDesign = action.payload;
        }
      })
      .addCase(updateDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update design";
      })

      // Delete design
      .addCase(deleteDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = state.designs.filter((d) => d._id !== action.payload);
      })
      .addCase(deleteDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete design";
      });
  }
});

export const { clearError, clearCurrentDesign } = designSlice.actions;
export default designSlice.reducer;
