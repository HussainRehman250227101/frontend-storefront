import { createSlice } from "@reduxjs/toolkit";
import { deleteItemFromCart, getCart, postItemToCart, reduceItemQuantityInCart } from "./CartThunk";
import type { cartInitial } from "./CartInterfaces";
import type { RootState } from "../../app/store";
import { toast } from "react-toastify";


const initialState:cartInitial = {
    cart: null,
    status : 'idle',
    error : null 
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCart.pending,(state)=>{
           state.status = 'loading' ;
        })
        .addCase(getCart.fulfilled,(state,action)=>{
            state.cart = action.payload
            state.status = 'succeeded';
        })
        .addCase(getCart.rejected,(state,action)=>{
            state.status = 'failed';
            if(action.payload ){
                state.error = JSON.stringify(action.payload)
            }else{
                state.error = 'getting the cart failed!'
            }
        })
        // for cart
        .addCase(postItemToCart.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(postItemToCart.fulfilled,(state)=>{
            state.status = 'succeeded';
            toast.success('added to cart successfully!')
        })
        .addCase(postItemToCart.rejected,(state,action)=>{
            state.status = 'failed';
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }else {
                state.error = JSON.stringify(action.payload)
            }
        })
        
        .addCase(deleteItemFromCart.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(deleteItemFromCart.fulfilled,(state)=>{
            state.status = 'succeeded';
            toast.success('deleted from cart successfully!')
        })
        .addCase(deleteItemFromCart.rejected,(state,action)=>{
            state.status = 'failed';
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }else {
                state.error = JSON.stringify(action.payload)
            }
        })
        
        .addCase(reduceItemQuantityInCart.pending,(state)=>{
            state.status = 'loading'
            
        })
        .addCase(reduceItemQuantityInCart.fulfilled,(state)=>{
            state.status = 'succeeded';
            toast.success('quantity reduced successfully!')
        })
        .addCase(reduceItemQuantityInCart.rejected,(state,action)=>{
            state.status = 'failed';
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }else {
                state.error = JSON.stringify(action.payload)
            }
        })

    },
});

export const selectCartId = (state:RootState)=> state.cart.cart?.id
export const selectCartItems = (state:RootState)=> state.cart.cart?.items
export default cartSlice.reducer;