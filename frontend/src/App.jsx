import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
