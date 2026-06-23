
import api from '../../api/axios'
import type { Collection, FetchProductsParams } from './ProductInterfaces'


export const fetchproducts = async ({ page, collection,search }: FetchProductsParams)=> {
    const params: Record<string, any> = { page }
    if (typeof collection === "number") {
        params.collection_id = collection
    }
    if (typeof search === "string") {
        params.search = search
    }

    const response = await api.get('/store/products/', {
        params,
    })
    return response.data
}

export const fetchCollections = async (): Promise<Collection[]> => {
    const response = await api.get('/store/collections/')
    return response.data
}


export const fetchProductReviews = async (product_id:number) => {

    const response = await api.get(`/store/products/${product_id}/reviews/`)
    return response.data

}
