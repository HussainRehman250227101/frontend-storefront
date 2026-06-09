import { RouterProvider } from "react-router"
import { router } from "./router"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    />
    </>
  
  )
}

export default App
