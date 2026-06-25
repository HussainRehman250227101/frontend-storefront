import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCart, fetchCart, addToCart, removeFromCart, reducequantityofitemFromCart } from "./CartRequests";
import axios from "axios";
import type { cartType, postToCart } from "./CartInterfaces";
import type { RootState } from "../../app/store";

export const getCart = createAsyncThunk<cartType>(
  "post/fetchCart",
  async (_, thunkAPI) => {
    try {

      let cart_id = localStorage.getItem("cart");

      if (cart_id) {
        const response = await fetchCart(cart_id);
        return response;
      }else{
        const cart = await createCart();
        localStorage.setItem('cart',cart.id)
        return cart ;

      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "Fetching the cart failed!" });
    }
  },
);

export const postItemToCart = createAsyncThunk(
  "post/cart",
  async (data: postToCart, thunkAPI) => {
    let cart_id = localStorage.getItem("cart");
    if (!cart_id) {
      const action = await thunkAPI.dispatch(getCart());

      if (getCart.fulfilled.match(action)) {
        cart_id = action.payload.id;
      } else {
        throw new Error("cart creation failed! ");
      }
    }
    try {
      const response = await addToCart(cart_id, data);
      return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "Adding item to cart failed!" });
    }
  },
);


export const reduceItemQuantityInCart = createAsyncThunk(
  "patch/cartitem",
  async ({item_id,data} :{item_id:number,data:postToCart}, thunkAPI) => {
    let cart_id = localStorage.getItem("cart");
    if (!cart_id) {
      const action = await thunkAPI.dispatch(getCart());

      if (getCart.fulfilled.match(action)) {
        cart_id = action.payload.id;
      } else {
        throw new Error("cart creation failed! ");
      }
    }
    try {
      const response = await reducequantityofitemFromCart(cart_id, item_id,data);
      return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "reducing item quantity from cart failed!" });
    }
  },
);

export const deleteItemFromCart = createAsyncThunk(
  "delete/cartitem",
  async (product_id:number, thunkAPI) => {
    let cart_id = localStorage.getItem("cart");
    if (!cart_id) {
      const action = await thunkAPI.dispatch(getCart());

      if (getCart.fulfilled.match(action)) {
        cart_id = action.payload.id;
      } else {
        throw new Error("cart creation failed! ");
      }
    }

    const state = thunkAPI.getState() as RootState
    const item = state.cart.cart?.items.find(i=>i.product.id === product_id)
    try { 
      if (item) {
        const response = await removeFromCart(cart_id, item.id);
        return response;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "removing item from cart failed!" });
    }
  },
);
