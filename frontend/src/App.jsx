import { Navigate, Route, Routes } from "react-router-dom"
import { About, Cart, Home, Login, PageNotFound, Register } from "./pages"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/page-not-found" element={<PageNotFound />} />

        <Route path="/*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </>
  )
}

export default App
