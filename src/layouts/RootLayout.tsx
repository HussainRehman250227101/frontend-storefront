import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"
import Nav from "../components/Nav/Nav"
import { useEffect } from "react"
import { store } from "../app/store"
import { getCart } from "../features/Cart/CartThunk"
// import SidebarContent from "../components/Home page/SidebarContent"
// import Navbar from "../components/Navbar"

const RootLayout = () => {

  useEffect(()=>{
    
    const appinitialize = async ()=> {

      const action = await store.dispatch(getCart());
      
      if (getCart.fulfilled.match(action)) {
        localStorage.setItem("cart",action.payload.id);
      } else {
        throw new Error("cart creation failed! ");
      }
    }
    appinitialize()

  },[])

  return (
    <Box>
      {/* <Navbar/> */}
      <Nav/>
      
      <Outlet/>
    </Box>
  )
}

export default RootLayout
