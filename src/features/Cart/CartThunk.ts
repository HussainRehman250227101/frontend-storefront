import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCart, fetchCart, addToCart, removeFromCart, reducequantityofitemFromCart } from "./CartRequests";
import axios from "axios";
import type { cartType, itemType, postToCart } from "./CartInterfaces";
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

export const postItemToCart = createAsyncThunk<itemType,postToCart>(
  "post/cart",
  async (data, thunkAPI) => {
    let cart_id = localStorage.getItem("cart");
    
    try {
      if(cart_id){
        const response = await addToCart(cart_id, data);
        return response;
      }else{
        getCart()
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "Adding item to cart failed!" });
    }
  
  },
);


export const reduceItemQuantityInCart = createAsyncThunk<itemType,{item_id:number,data:postToCart}>(
  "patch/cartitem",
  async ({item_id,data}, thunkAPI) => {
    let cart_id = localStorage.getItem("cart");
    try {
      if(cart_id){

        const response = await reducequantityofitemFromCart(cart_id, item_id,data);
        return response;
      }else{
        getCart()
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "Reducing item quantity from cart failed!" });
    }
  },
);

export const deleteItemFromCart = createAsyncThunk(
  "delete/cartitem",
  async (product_id:number, thunkAPI) => {
    let cart_id = localStorage.getItem("cart");
    
    const state = thunkAPI.getState() as RootState
    const item = state.cart.cart?.items.find(i=>i.product.id === product_id)
    try { 
      if (item && cart_id) {
        const response = await removeFromCart(cart_id, item.id);
        return response;
      }else{
        getCart()
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "removing item from cart failed!" });
    }
  },
);
