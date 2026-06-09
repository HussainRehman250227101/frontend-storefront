import api from "../../api/axios";
import type {
  loginInterface,
  signupPostInterface,
  userDataInterface,
} from "./AuthInterfaces";


export const signupRequest = async (data: signupPostInterface) => {
  const customer_data = {
    phone: data.phone,
    birth_date: data.birth_date.toISOString().split('T')[0],
  };

  const user_data = {
    username: data.username,
    password: data.password,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
  };

  const login_data = {
    username: data.username,
    password: data.password,
  };
  const userResponse = await api.post("/auth/users/", user_data);

  const userlogin = await loginRequest(login_data);
  if (userlogin.access){
    localStorage.setItem('isAuthenticated', 'true')
  }

  localStorage.setItem("access", userlogin.access);
  localStorage.setItem("refresh", userlogin.refresh);

  const customerResponse = await api.post("/store/customers/",customer_data);
  return { ...userResponse.data, ...customerResponse.data };
};



export const loginRequest = async (data: loginInterface) => {
  const response = await api.post("/auth/jwt/create/", data);
  return response.data;
};


export const userProfileRequest = async ():Promise<userDataInterface> => {
  const userResponse = await api.get("/auth/users/me/");
  const customerResponse = await api.get("/store/customers/me/");

  return  {
    ...userResponse.data, ...customerResponse.data
  };
};

// export const userProfilePostRequest = async():Promise<> => {
  
// }
