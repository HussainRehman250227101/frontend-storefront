import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchproducts } from "./ProductRequests";
import axios from "axios";


export const fetchProducts=createAsyncThunk('get/fetchProducts', async(_,thunkAPI)=>{
    try{

        const response = fetchproducts()
        return response
    }catch(err){
        if(axios.isAxiosError(err)){
            return thunkAPI.rejectWithValue(err.response?.data)
        }
        return thunkAPI.rejectWithValue("something went wrong!")
    }
})
