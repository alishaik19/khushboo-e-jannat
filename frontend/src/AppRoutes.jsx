import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

import HomePage from "./landing_page/home/HomePage";
import Cart from "./landing_page/cart/Cart";
import Orders from "./landing_page/orders/Orders";
import About from "./landing_page/about/About";
import Contact from "./landing_page/contact/Contact";
import History from "./landing_page/history/History";
import Checkout from "./Checkout";
import PageTransition from "./PageTransition";
import NotFound from "./NotFound";
import Signup from "./landing_page/account/Signup";
import Login from "./landing_page/account/Login";
import ForgotPassword from "./landing_page/account/ForgotPassword";
import ResetPassword from "./landing_page/account/ResetPassword";
import Profile from "./landing_page/account/Profile";
import ProductDetail from "./ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />

          <Route
            path="/product/:id"
            element={
              <PageTransition>
                <ProductDetail />
              </PageTransition>
            }
          />

          <Route
            path="/cart"
            element={
              <PageTransition>
                <Cart />
              </PageTransition>
            }
          />

          <Route
            path="/orders"
            element={
              <PageTransition>
                <Orders />
              </PageTransition>
            }
          />

          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />

          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />

          <Route
            path="/checkout"
            element={
              <PageTransition>
                <Checkout />
              </PageTransition>
            }
          />

          <Route
            path="/history"
            element={
              <PageTransition>
                <History />
              </PageTransition>
            }
          />

          <Route
            path="/signup"
            element={
              <PageTransition>
                <Signup />
              </PageTransition>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PageTransition>
                <ForgotPassword />
              </PageTransition>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <PageTransition>
                <ResetPassword />
              </PageTransition>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Profile />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <NotFound />
                </PageTransition>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default AppRoutes;
