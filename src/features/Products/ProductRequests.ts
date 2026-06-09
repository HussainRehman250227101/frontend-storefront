import api from '../../api/axios'

export const fetchproducts = async ()=> {
    const response = await api.get('/store/products')
    return response.data
}

