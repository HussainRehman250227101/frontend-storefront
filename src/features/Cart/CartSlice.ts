import { createSlice } from "@reduxjs/toolkit";
import {
  deleteItemFromCart,
  getCart,
  postItemToCart,
  reduceItemQuantityInCart,
} from "./CartThunk";
import type { cartInitial } from "./CartInterfaces";
import type { RootState } from "../../app/store";
import { toast } from "react-toastify";

const initialState: cartInitial = {
  cart: null,
  productIDs: {},
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "succeeded";
        state.productIDs = {};
        action.payload.items.forEach(
          (item) => (state.productIDs[item.product.id] = true),
        );
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = JSON.stringify(action.payload);
        } else {
          state.error = "getting the cart failed!";
        }
      })
      // for cart
      .addCase(postItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const ex_item = state.cart?.items.find(
          (i) => i.id === action.payload.id,
        );
        if (ex_item) {
          Object.assign(ex_item,action.payload)
        } else {
          state.cart?.items.push(action.payload);
        }
        if (state.cart) {
          state.cart.total_price = state.cart.items.reduce(
            (sum, item) => sum + item.total_price,
            0,
          );
        }
        state.productIDs[action.payload.product.id] = true;
        toast.success("added to cart successfully!");
      })
      .addCase(postItemToCart.rejected, (state, action) => {
        state.status = "failed";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = JSON.stringify(action.payload);
        }
      })

      .addCase(deleteItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.cart) {
          state.cart.items = state.cart.items.filter(
            (item) => item.product.id !== action.meta.arg,
          );
          delete state.productIDs[action.meta.arg];
          state.cart.total_price = state.cart.items.reduce((sum,item)=> sum + item.total_price,0)
        }

        toast.success("deleted from cart successfully!");
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = JSON.stringify(action.payload);
        }
      })

      .addCase(reduceItemQuantityInCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(reduceItemQuantityInCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.cart) {
          const item = state.cart.items.find(
            (i) => i.id === action.payload.id,
          );
          if (item) {
            item.quantity = action.payload.quantity;
            item.total_price = action.payload.total_price;
          }
          state.cart.total_price = state.cart.items.reduce((sum,item)=> sum + item.total_price,0)
        }
        toast.success("quantity reduced successfully!");
      })
      .addCase(reduceItemQuantityInCart.rejected, (state, action) => {
        state.status = "failed";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = JSON.stringify(action.payload);
        }
      });
  },
});

export const selectCartId = (state: RootState) => state.cart.cart?.id;
export const selectCartItems = (state: RootState) => state.cart.cart?.items;
export default cartSlice.reducer;
