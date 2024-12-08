// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    Title: string;
    Price: number;
  }
  
  interface CartState {
    items: CartItem[];
    totalPrice: number;
  }
  
  const initialState: CartState = {
    items: [],
    totalPrice: 0,
  };

  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart: (state, action: PayloadAction<any>) => {
        console.log(action.payload.Cart);
        console.log(action.payload)
        const cartItems = action.payload.Cart.map((product: any) => ({
          id: product.id,
          Title: product.Title,
          Price: product.Price, 
        })) || [];
  
        state.items = cartItems;
        state.totalPrice = cartItems.reduce((total: number, item: CartItem) => total + item.Price, 0);
      },
      removeFromCart: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalPrice = state.items.reduce((total, item) => total + item.Price, 0);
      },
      updateTotalPrice: (state, action: PayloadAction<number>) => {
        state.totalPrice = action.payload;
      },
    },
  });
  
  export const { setCart, removeFromCart, updateTotalPrice } = cartSlice.actions;
  
  export default cartSlice.reducer;