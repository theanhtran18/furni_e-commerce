
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  _id: string;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  selectedItems: CartItem[];
}

const initialState: CartState = {
  selectedItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedItems(state, action: PayloadAction<CartItem[]>) {
      state.selectedItems = action.payload;
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { setSelectedItems, clearSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
