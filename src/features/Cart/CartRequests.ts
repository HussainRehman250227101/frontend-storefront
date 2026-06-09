
import api from '../../api/axios'
import type { postToCart } from './CartInterfaces'



export const createCart = async ()=> {
    const response = await api.post('/store/cart/',{})
    return response.data
};


export const fetchCart = async (cart_id:string)=> {
    const response = await api.get(`/store/cart/${cart_id}`)
    return response.data
};

export const addToCart = async (cart_id:string,data:postToCart) => {
    const response  = await api.post(`/store/cart/${cart_id}/items/`, data)
    
    return response.data
};

export const removeFromCart = async (cart_id:string,item_id:number) => {
    const response  = await api.delete(`/store/cart/${cart_id}/items/${item_id}/`)

    return response.data
};

export const reducequantityofitemFromCart = async (cart_id:string,item_id:number,data:postToCart) => {
    const response  = await api.patch(`/store/cart/${cart_id}/items/${item_id}/`,data)
    return response.data
};