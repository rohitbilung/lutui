import { Navigate, Route, Routes } from "react-router-dom"
import { About, Cart, Home, InDevelopment, Login, PageNotFound, ProductDetails, Register } from "./pages"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coming-soon" element={<InDevelopment />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        <Route path="/page-not-found" element={<PageNotFound />} />

        <Route path="/*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </>
  )
}

export default App
