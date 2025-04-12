import { Navigate, Route, Routes } from "react-router-dom";
import {
  About,
  AdminDashboard,
  CancellationPolicy,
  Cart,
  Checkout,
  Home,
  InDevelopment,
  Login,
  PageNotFound,
  PricingPolicy,
  PrivacyPolicy,
  ProductDetails,
  ProductList,
  Register,
  Terms,
} from "./pages";
import ScrollToTop from "./components/shared/common/ScrollToTop";
import ProtectedRoutes from "./components/shared/common/layouts/ProtectedRoutes";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coming-soon" element={<InDevelopment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/pricing-policy" element={<PricingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/cancellation-refund-policy"
          element={<CancellationPolicy />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-list/:product_type" element={<ProductList />} />
        <Route path="/collection/:sub_category" element={<ProductList />} />

        <Route path="/" element={<ProtectedRoutes allowedRoles={['admin','user']} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="/" element={<ProtectedRoutes allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/page-not-found" element={<PageNotFound />} />

        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </>
  );
};

export default App;
