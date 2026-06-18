import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, addToCart, decreaseQty } = useCart();
  const navigate = useNavigate();

  const handleDelete = (item) => {
    removeFromCart(item.id);

    toast(
      <div className="toast-undo">
        <span>Removed from Cart ❌</span>

        <button
          onClick={() => {
            addToCart(item);
            toast.dismiss();
          }}
          className="undo-btn"
        >
          Undo
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 4000,
      },
    );
  };
  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to proceed to checkout 🚨");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="container cart-page mt-5 ">
      <h2>My Cart</h2>

      {/* EMPTY CART UI */}
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty cart"
          />

          <h3>Your Cart is Empty</h3>
          <p>Looks like you haven’t added anything yet</p>

          <a href="/" className="shop-btn">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>

              <div className="cart-info">
                <p>{item.price}</p>

                {/* Quantity Controls */}
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>

                  <span>{item.qty}</span>

                  <button onClick={() => addToCart(item)}>+</button>
                </div>

                {/* Delete Button */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <button
          className="checkout-btn"
          onClick={() => {
            const token = localStorage.getItem("token");

            if (!token) {
              toast.error("Please login first to proceed to checkout 🚨");

              setTimeout(() => {
                navigate("/login");
              }, 1000);

              return;
            }

            navigate("/checkout");
          }}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
