import "./ReturnOrders.css";
import { useEffect, useState } from "react";
import axios from "axios";
if (!import.meta.env.VITE_API_URL) {
  console.warn("VITE_API_URL is missing");
}
const API_URL = import.meta.env.VITE_API_URL;

function ReturnOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders/admin/returns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // APPROVE RETURN
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        {
          status: "Return Processing", // 🔥 IMPORTANT CHANGE
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // refresh list
      fetchReturns();
    } catch (err) {
      console.log(err);
    }
  };
  // REJECT RETURN
  // REJECT RETURN
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        {
          status: "Return Rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchReturns();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="return-page">
      <h2 className="title">Return Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="empty">No return requests 🚫</p>
      ) : (
        <div className="return-grid">
          {orders.map((order) => (
            <div className="return-card" key={order._id}>
              <h3>Order #{order._id.slice(-6)}</h3>

              <p>
                <b>User:</b> {order.userId?.name || "User"}
              </p>

              <p>
                <b>Amount:</b> ₹{order.totalAmount}
              </p>

              <p>
                <b>Status:</b> <span className="status">{order.status}</span>
              </p>

              <p>
                <b>Reason:</b> {order.returnReason || "No reason provided"}
              </p>

              <div className="items">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} - {item.qty} × ₹{item.price}
                  </p>
                ))}
              </div>

              <div className="btn-group">
                <button
                  className="approve"
                  onClick={() => handleApprove(order._id)}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => handleReject(order._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReturnOrders;
