import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productThunk";
import type { productInitialState } from "./ProductInterfaces";
import type { RootState } from "../../app/store";


const initialState:productInitialState = {
    products : [],
    productsCount : 0,
    next : null,
    previous : null,
    status : 'idle',
    error : null 
}

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
           state.status = 'loading' ;
           state.error = null;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products = action.payload.results
            state.productsCount = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.payload ?? "something went wrong!";
        });
    },
});

export const selectProducts = (state:RootState)=> state.products.products
export default productSlice.reducer;
