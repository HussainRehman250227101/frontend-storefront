import { configureStore } from "@reduxjs/toolkit"
import productsReducer from '../features/Products/ProductSlice'
import cartReducer from '../features/Cart/CartSlice'
import userReducer from '../features/Auth/AuthSlice'

export const store =configureStore({
    reducer:{
        products:productsReducer,
        cart: cartReducer,
        user : userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch