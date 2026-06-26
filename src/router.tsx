import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/cart"));
const LoginPage = lazy(() => import("./features/Auth/components/login"));
const SignupPage = lazy(() => import("./features/Auth/components/signup"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const NotFound = lazy(() => import("./components/Home page/NotFound"));

import RootLayout from "./layouts/RootLayout";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            <Route path="products/:id" element={<ProductDetailPage/>}/>
            <Route path="*" element={<NotFound/>} />
        </Route>
    )
) 