import api from '../../api/axios'
import type { Collection, FetchProductsParams } from './ProductInterfaces'

export const fetchproducts = async ({ page, collection }: FetchProductsParams)=> {
    const params: Record<string, number> = { page }
    if (typeof collection === "number") {
        params.collection = collection
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

