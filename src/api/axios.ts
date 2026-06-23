import axios from "axios";


const api = axios.create({
    baseURL:'https://www.hussaindev.tech/store'
})

api.interceptors.request.use((config)=>{
    let token = localStorage.getItem('access')
    
    if(token)
        if (config.headers){
        config.headers.Authorization = `JWT ${token}`
        }
        return config;
    }
)

export default api;