import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, Product, Review } from "../../types/types";
import { fetchProduct, fetchProductByQuery, fetchReviewsByProductId } from "./product-thunks";

export interface ProductState {
    product: Partial<Product>;
    reviews: Array<Review>;
    errorMessage: string;
    loadingState: LoadingStatus;
}

export const initialState: ProductState = {
    product: {},
    reviews: [],
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<Product>) {
            state.product = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setReview(state, action: PayloadAction<Review>) {
            state.reviews = [...state.reviews, action.payload];
            state.loadingState = LoadingStatus.LOADED;
        },
        resetProductState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchProductByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchProductByQuery.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchProductByQuery.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});

export const { setProduct, setReview, resetProductState } = productSlice.actions;
export default productSlice.reducer;
