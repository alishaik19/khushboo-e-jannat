import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

function History() {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  // =========================
  // FETCH HISTORY
  // =========================
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders/admin/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // =========================
  // DELETE FROM HISTORY (HIDE)
  // =========================
  const removeFromHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/admin/history/${selectedHistoryId}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowDeleteModal(false);
      setSelectedHistoryId(null);

      fetchHistory();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // =========================
  // STATUS BADGE COLOR
  // =========================
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success";

      case "Cancelled":
        return "bg-danger";

      case "Return Requested":
        return "bg-warning text-dark";

      case "Return Processing":
        return "bg-info text-dark";

      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <div className="card-box">
        <h2 className="page-title">Order History</h2>

        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>

                  <td>
                    <strong>{order.shippingDetails?.fullName || "N/A"}</strong>
                  </td>

                  <td>₹{order.totalAmount}</td>

                  <td>
                    <span className={`badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      order.updatedAt || order.createdAt,
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedHistoryId(order._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No History Found 📦
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          CONFIRM MODAL
      ========================= */}
      {showDeleteModal && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <div className="modal-icon">🗑️</div>

            <h3>Remove History</h3>

            <p>Are you sure you want to hide this order from history?</p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedHistoryId(null);
                }}
              >
                Cancel
              </button>

              <button className="confirm-btn" onClick={removeFromHistory}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default History;
