import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api.config";
import { Review, CreateReviewData, ApiResponse } from "@/types";

interface ReviewState {
  reviews: Review[];
  currentReview: Review | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  currentReview: null,
  loading: false,
  error: null
};

// Async thunks
export const createReview = createAsyncThunk(
  "reviews/create",
  async (data: CreateReviewData) => {
    const response = await axiosInstance.post<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEW.CREATE,
      data
    );
    return response.data.data;
  }
);

export const fetchDesignReviews = createAsyncThunk(
  "reviews/fetchForDesign",
  async (designId: string) => {
    const response = await axiosInstance.get<ApiResponse<Review[]>>(
      API_ENDPOINTS.REVIEW.DESIGN_REVIEWS(designId)
    );
    return response.data.data;
  }
);

export const fetchReviewById = createAsyncThunk(
  "reviews/fetchById",
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEW.SINGLE(id)
    );
    return response.data.data;
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id: string) => {
    await axiosInstance.delete(API_ENDPOINTS.REVIEW.DELETE(id));
    return id;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create review";
      })

      .addCase(fetchDesignReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesignReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchDesignReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      })

      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.currentReview = action.payload;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
      });
  }
});

export const { clearError, clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
