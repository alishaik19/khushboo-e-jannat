import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import PageNotFound from "./pages/PageNotFound";

import Dashboard from "./pages/Dashboard";
import ReturnHistory from "./pages/ReturnHistory";
import ReturnOrders from "./pages/ReturnOrders";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import History from "./pages/History";

import Login from "./pages/Login";

import AdminRoute from "./components/AdminRoute";

import "./styles/admin.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🧱 ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="return-history" element={<ReturnHistory />} />
          <Route path="products" element={<Products />} />
          <Route path="returns" element={<ReturnOrders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="history" element={<History />} />
        </Route>

        {/* ❌ 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
