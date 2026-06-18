import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
if (!import.meta.env.VITE_API_URL) {
  console.warn("VITE_API_URL is missing");
}
const API_URL = import.meta.env.VITE_API_URL;
function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  // =========================
  // GET ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.log("ADMIN ORDERS ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${selectedOrderId}/status`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowModal(false);

      // fresh data load
      fetchOrders();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
  return (
    <div>
      <h2 className="page-title">Orders</h2>

      <div className="card-box">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>

                <td>
                  <strong>{order.shippingDetails?.fullName}</strong>
                  <br />
                  <small>{order.shippingDetails?.phone}</small>
                </td>

                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item.name}
                    </div>
                  ))}
                </td>

                <td>{order.items.reduce((t, i) => t + i.qty, 0)}</td>

                <td>₹{order.totalAmount}</td>

                <td>
                  <span className="badge bg-success">Paid</span>
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      setSelectedOrderId(order._id);
                      setSelectedStatus(e.target.value);
                      setShowModal(true);
                    }}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td>
                  {order.shippingDetails?.address}
                  <br />
                  <small>
                    {order.shippingDetails?.city} -{" "}
                    {order.shippingDetails?.pincode}
                  </small>
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL */}
        {showModal && (
          <div className="order-modal-overlay">
            <div className="order-modal">
              <div className="modal-icon">⚠️</div>

              <h3>Update Order Status</h3>

              <p>Are you sure you want to change this order status to</p>

              <span className="status-preview">{selectedStatus}</span>

              <div className="modal-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOrderId(null);
                    setSelectedStatus("");
                  }}
                >
                  Cancel
                </button>

                <button className="confirm-btn" onClick={updateStatus}>
                  Yes, Update
                </button>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div className="text-center py-4">No Orders Found</div>
        )}
      </div>
    </div>
  );
}

export default Orders;
