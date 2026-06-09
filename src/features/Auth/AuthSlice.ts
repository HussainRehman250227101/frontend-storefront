import { createSlice } from "@reduxjs/toolkit";
import type { UserInitital } from "./AuthInterfaces";
import { loginThunk, signupThunk, userProfileThunk } from "./AuthThunks";
import type { RootState } from "../../app/store";




const initialState:UserInitital = {
    user: null,
    status : 'idle',
    error : null,
    isAuthenticated :false 
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('isAuthenticated');
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers:(builder)=>{
        // for login
        builder
        .addCase(loginThunk.pending,(state)=>{
           state.status = 'loading' ;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            localStorage.setItem('access',action.payload.access)
            localStorage.setItem('refresh',action.payload.refresh)
            localStorage.setItem('isAuthenticated','true')
            state.isAuthenticated = true;
            state.status = 'succeeded';
        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.status = 'failed';
            if(action.payload ){
                state.error = JSON.stringify(action.payload)
            }else{
                state.error = 'getting the cart failed!'
            }
        })
        // for signup
        .addCase(signupThunk.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(signupThunk.fulfilled,(state)=>{
            state.status = 'succeeded';
        })
        .addCase(signupThunk.rejected,(state,action)=>{
            state.status = 'failed';
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }else {
                state.error = JSON.stringify(action.payload)
            }
        })
        // for user rpofile
        .addCase(userProfileThunk.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(userProfileThunk.fulfilled,(state,action)=>{
            state.user = action.payload            
            state.status = 'succeeded';
        })
        .addCase(userProfileThunk.rejected,(state,action)=>{
            state.status = 'failed';
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }else {
                state.error = JSON.stringify(action.payload)
            }
        })
        


        

    },
});
export const { logout } = userSlice.actions;
export const selectUser = (state:RootState)=> state.user.user
export const selectstatus = (state:RootState)=> state.user.status
export default userSlice.reducer;