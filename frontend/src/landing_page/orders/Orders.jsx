import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // GET ORDERS (FIXED)
  // =========================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const activeOrders = res.data.filter((order) =>
        ["Placed", "Processing", "Shipped"].includes(order.status),
      );

      setOrders(activeOrders);
    } catch (err) {
      console.log("FETCH ORDERS ERROR:", err.response?.data || err.message);
    }
  };

  // =========================
  // CANCEL ORDER (FIXED)
  // =========================
  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${selectedOrderId}/status`,
        { status: "Cancelled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((prev) =>
        prev.filter((order) => order._id !== selectedOrderId),
      );

      setShowModal(false);
      setSelectedOrderId(null);
    } catch (err) {
      console.log("CANCEL ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <section className="orders-section">
      <div className="container">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-box">
            <p>No active orders 📦</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <h3>Order #{order._id.slice(-6)}</h3>

                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <span>
                      {index + 1}. {item.name}
                    </span>
                    <span>
                      {item.qty} × ₹{item.price}
                    </span>
                  </div>
                ))}

                <hr />

                <p>Total: ₹{order.totalAmount}</p>

                <p className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </p>

                {["placed", "processing"].includes(
                  order.status?.toLowerCase(),
                ) && (
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      setShowModal(true);
                    }}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <h3>Cancel Order?</h3>

            <p>Are you sure you want to cancel this order?</p>

            <div className="modal-buttons">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedOrderId(null);
                }}
              >
                No
              </button>

              <button onClick={cancelOrder}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Orders;
