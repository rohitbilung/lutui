import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
