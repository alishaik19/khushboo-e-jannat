import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-bg">
          <ToastContainer position="top-right" autoClose={2000} />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
