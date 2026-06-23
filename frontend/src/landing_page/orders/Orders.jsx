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

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const activeOrders = res.data.filter((order) =>
        ["Placed", "Processing", "Shipped"].includes(order.status),
      );

      setOrders(activeOrders);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${selectedOrderId}/status`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setOrders((prev) => prev.filter((o) => o._id !== selectedOrderId));

      setShowModal(false);
      setSelectedOrderId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="orders-section">
      <div className="container">
        <h2 className="orders-title">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-box">No active orders 📦</div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const dateObj = new Date(order.createdAt);

                  return (
                    <tr key={order._id}>
                      {/* ORDER ID */}
                      <td>#{order._id.slice(-6)}</td>

                      <td>
                        <div className="date-time">
                          <span>{dateObj.toLocaleDateString("en-IN")}</span>
                          <span>
                            {dateObj.toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>

                      {/* ITEMS */}
                      <td>
                        {order.items.map((item, i) => (
                          <div key={i} className="table-item">
                            {item.name} × {item.qty}
                          </div>
                        ))}
                      </td>

                      {/* TOTAL */}
                      <td>₹{order.totalAmount}</td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`status ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td>
                        {["Placed", "Processing"].includes(order.status) ? (
                          <button
                            className="cancel-btn"
                            onClick={() => {
                              setSelectedOrderId(order._id);
                              setShowModal(true);
                            }}
                          >
                            Cancel
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <h3>Cancel Order?</h3>
            <p>Are you sure you want to cancel this order?</p>

            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>No</button>
              <button onClick={cancelOrder}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Orders;
