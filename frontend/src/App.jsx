import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  About,
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
  Register,
  Terms,
} from "./pages";
import ProtectedRoutes from "./components/shared/common/layouts/ProtectedRoutes";

const App = () => {

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

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

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/" element={<ProtectedRoutes />}>
      </Route> */}

        <Route path="/page-not-found" element={<PageNotFound />} />

        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </>
  );
};

export default App;
