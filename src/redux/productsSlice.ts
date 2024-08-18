import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interfaces/Product";

interface ProductState {
  loading: boolean;
  products: Product[];
  selectedProducts: Product[];
  dispatchedProducts: Product[];
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  selectedProducts: [],
  dispatchedProducts: [],
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    markProductAsDispatched(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        state.dispatchedProducts.push(product);
      }
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  markProductAsDispatched,
} = productSlice.actions;

export default productSlice.reducer;
