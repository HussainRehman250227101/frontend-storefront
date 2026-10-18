import { RouterProvider } from "react-router"
import { router } from "./router"
import { ToastContainer } from "react-toastify"
import ShoppingAssistant from "./components/ShoppingAssistant"

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    <ShoppingAssistant />
    <ToastContainer
    position="top-right"
    autoClose={3000}
    />
    </>
  
  )
}

export default App
