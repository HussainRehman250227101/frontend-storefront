import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from './layouts/RootLayout'
import Home from "./pages/Home";
import Cart from './pages/cart'
import LoginPage from "./features/Auth/components/login";
import SignupPage from "./features/Auth/components/signup";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./components/Products/ProductDetailPage";
import NotFound from "./components/NotFound";


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