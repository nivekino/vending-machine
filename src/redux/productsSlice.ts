import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interfaces/Product";

interface PreparingOrder {
  id: string;
  product: Product;
  timeLeft: number;
}

interface ProductState {
  loading: boolean;
  products: Product[];
  preparingOrders: PreparingOrder[];
  dispatchedProducts: Product[];
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  preparingOrders: [],
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
    startProductPreparation(state, action: PayloadAction<PreparingOrder>) {
      state.preparingOrders.push(action.payload);
    },
    updateProductPreparation(
      state,
      action: PayloadAction<{ id: string; timeLeft: number }>
    ) {
      const order = state.preparingOrders.find(
        (order) => order.id === action.payload.id
      );
      if (order) {
        order.timeLeft = action.payload.timeLeft;
      }
    },

    markProductAsDispatched(state, action: PayloadAction<string>) {
      const orderIndex = state.preparingOrders.findIndex(
        (order) => order.id === action.payload
      );
      if (orderIndex > -1) {
        const [dispatchedOrder] = state.preparingOrders.splice(orderIndex, 1);
        state.dispatchedProducts.push(dispatchedOrder.product);
      }
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  startProductPreparation,
  updateProductPreparation,
  markProductAsDispatched,
} = productSlice.actions;

export default productSlice.reducer;
