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
  Orders,
  PageNotFound,
  PricingPolicy,
  PrivacyPolicy,
  ProductDetails,
  ProductList,
  Register,
  Terms,
  Users,
} from "./pages";
import ScrollToTop from "./components/shared/common/ScrollToTop";
import ProtectedRoutes from "./components/shared/common/layouts/ProtectedRoutes";
import Profile from "./pages/_auth/admin/Profile";
import Settings from "./pages/_auth/admin/Settings";
import { useLogUserVisit } from './lib/queries/queries';

const App = () => {
  const { data: logData } = useLogUserVisit()
  console.log("logData: ", logData)

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/" element={<ProtectedRoutes allowedRoles={['admin','user']} />}>
        </Route>

        <Route path="/" element={<ProtectedRoutes allowedRoles={['admin']} />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/page-not-found" element={<PageNotFound />} />

        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </>
  );
};

export default App;
