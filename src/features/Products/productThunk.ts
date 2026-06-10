import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchproducts } from "./ProductRequests";
import axios from "axios";
import type {
    FetchProductsParams,
    PaginatedProductsResponse,
} from "./ProductInterfaces";


export const fetchProducts=createAsyncThunk<
    PaginatedProductsResponse,
    FetchProductsParams,
    { rejectValue: string }
>('get/fetchProducts', async(page,thunkAPI)=>{
    try{
        const response = await fetchproducts(page)
        return response
    }catch(err){
        if(axios.isAxiosError(err)){
            return thunkAPI.rejectWithValue(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : "something went wrong!",
            )
        }
        return thunkAPI.rejectWithValue("something went wrong!")
    }
})
