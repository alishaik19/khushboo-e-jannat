import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
if (!import.meta.env.VITE_API_URL) {
  console.warn("VITE_API_URL is missing");
}
const API_URL = import.meta.env.VITE_API_URL;

function ReturnHistory() {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchReturnHistory();
  }, []);

  const fetchReturnHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/orders/admin/return-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ==========================
  // MARK RETURNED
  // ==========================
  const markReturned = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        {
          status: "Returned",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchReturnHistory();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ==========================
  // REMOVE HISTORY
  // ==========================
  const removeHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/admin/history/${selectedId}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowDeleteModal(false);
      setSelectedId(null);

      fetchReturnHistory();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "Return Processing":
        return "bg-info";

      case "Returned":
        return "bg-success";

      case "Return Rejected":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <div className="card-box">
        <h2 className="page-title">Return History</h2>

        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Return Reason</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>

                  <td>{order.shippingDetails?.fullName || "N/A"}</td>

                  <td>₹{order.totalAmount}</td>

                  <td>
                    <span className={`badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  <td>{order.returnReason || "-"}</td>

                  <td>
                    {new Date(
                      order.updatedAt || order.createdAt,
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      {order.status === "Return Processing" && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => markReturned(order._id)}
                        >
                          Mark Returned
                        </button>
                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setSelectedId(order._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Return History Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <h3>Remove Return History</h3>

            <p>Are you sure you want to remove this return record?</p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
              >
                Cancel
              </button>

              <button className="confirm-btn" onClick={removeHistory}>
                Yes Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReturnHistory;
