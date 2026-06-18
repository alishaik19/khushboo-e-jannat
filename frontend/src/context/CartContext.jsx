import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?._id) {
      return `cart_${user._id}`;
    }

    if (user?.id) {
      return `cart_${user.id}`;
    }

    return "guest_cart";
  };

  const [cart, setCart] = useState(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Reload cart when user changes
  useEffect(() => {
    const loadCart = () => {
      const cartKey = getCartKey();
      const savedCart = localStorage.getItem(cartKey);

      setCart(savedCart ? JSON.parse(savedCart) : []);
    };

    loadCart();

    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  // Save cart
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    const cartKey = getCartKey();

    setCart([]);
    localStorage.removeItem(cartKey);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
