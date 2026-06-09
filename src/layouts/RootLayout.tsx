import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"
import Nav from "../components/Nav"
// import SidebarContent from "../components/Home page/SidebarContent"
// import Navbar from "../components/Navbar"

const RootLayout = () => {
  return (
    <Box>
      {/* <Navbar/> */}
      <Nav/>
      
      <Outlet/>
    </Box>
  )
}

export default RootLayout
