import axios from "axios";


const api = axios.create({
    baseURL:'https://api.hussaindev.tech'
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