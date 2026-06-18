import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import ProductDetail from "./ProductDetail";

import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { CartProvider } from "./context/CartContext";

import HomePage from "./landing_page/home/HomePage";
import Cart from "./landing_page/cart/Cart";
import Orders from "./landing_page/orders/Orders";
import About from "./landing_page/about/About";
import Contact from "./landing_page/contact/Contact";
import History from "./landing_page/history/History";
import Checkout from "./Checkout";
import Signup from "./landing_page/account/Signup";
import Login from "./landing_page/account/Login";
import ResetPassword from "./landing_page/account/ResetPassword";
import ForgotPassword from "./landing_page/account/ForgotPassword";
import Profile from "./landing_page/account/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");
  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <BrowserRouter>
        <ScrollToTop />

        <Navbar />

        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<History />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />;
          {/* protected route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
