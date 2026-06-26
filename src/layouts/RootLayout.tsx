import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"
import Nav from "../components/Nav/Nav"
import { Suspense } from "react"
import ProductPageSkeleton from "../components/skeleton/ProductPageSkeleton"

const RootLayout = () => {

  return (
    <Box>
      {/* <Navbar/> */}
      <Nav/>
      <Suspense fallback={<ProductPageSkeleton/>} ></Suspense>
      <Outlet/>
    </Box>
  )
}

export default RootLayout
