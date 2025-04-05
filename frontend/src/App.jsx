import { Navigate, Route, Routes } from "react-router-dom"
import { About, Cart, Checkout, Home, InDevelopment, Login, PageNotFound, ProductDetails, Register } from "./pages"
import ProtectedRoutes from "./components/shared/common/layouts/ProtectedRoutes"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coming-soon" element={<InDevelopment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/product/:productId" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* <Route path="/" element={<ProtectedRoutes />}>
      </Route> */}
      
      <Route path="/page-not-found" element={<PageNotFound />} />

      <Route path="*" element={<Navigate to="/page-not-found" />} />
    </Routes>
  )
}

export default App
