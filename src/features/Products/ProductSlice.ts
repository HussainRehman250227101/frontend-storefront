import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productThunk";
import type { productInitialState } from "./ProductInterfaces";
import type { RootState } from "../../app/store";


const initialState:productInitialState = {
    products : [],
    productsCount : 0,
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
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products = state.products.concat(action.payload.results)
            state.status = 'succeeded';
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.payload as string;
        });
    },
});

export const selectProducts = (state:RootState)=> state.products.products
export default productSlice.reducer;