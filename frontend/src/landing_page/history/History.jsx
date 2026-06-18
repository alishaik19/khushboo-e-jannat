import "./History.css";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function History() {
  const [historyOrders, setHistoryOrders] = useState([]);

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1); // 1 confirm, 2 reason

  useEffect(() => {
    fetchHistory();
  }, []);

  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // only history orders
      const filteredOrders = res.data.filter((order) =>
        [
          "Delivered",
          "Cancelled",
          "Return Requested",
          "Return Processing",
          "Returned",
          "Return Rejected",
        ].includes(order.status),
      );

      setHistoryOrders(filteredOrders);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= OPEN MODAL =================
  const openReturnModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setStep(1);
    setReason("");
  };

  // ================= SUBMIT RETURN =================
  const submitReturn = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/orders/return/${selectedOrder._id}`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ ONLY UPDATE STATUS LOCALLY (NO REMOVE)
      setHistoryOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: "Return Requested" }
            : order,
        ),
      );

      // reset modal
      setShowModal(false);
      setReason("");
      setSelectedOrder(null);
      setStep(1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="history-section">
      <div className="container">
        <h2 className="history-title">Order History</h2>

        {historyOrders.length === 0 ? (
          <p className="history-empty">No Order History Yet 📦</p>
        ) : (
          <div className="history-grid">
            {historyOrders.map((order) => (
              <div className="history-card" key={order._id}>
                <h3>Order #{order._id.slice(-6)}</h3>

                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} - {item.qty} × ₹{item.price}
                  </p>
                ))}

                <hr />

                <p>Total: ₹{order.totalAmount}</p>

                <p
                  className={`status ${order.status.replace(/\s/g, "").toLowerCase()}`}
                >
                  {order.status}
                </p>

                <small>
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </small>

                {/* ================= RETURN BUTTON ================= */}
                {order.status === "Delivered" && (
                  <button
                    className="return-btn"
                    onClick={() => openReturnModal(order)}
                  >
                    Return Order
                  </button>
                )}

                {order.status === "Return Requested" && (
                  <p className="return-pending">Return Requested ⏳</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            {step === 1 && (
              <>
                <h2>Are you sure?</h2>
                <p>Do you want to return this order?</p>

                <div className="modal-actions">
                  <button onClick={() => setShowModal(false)}>No</button>

                  <button onClick={() => setStep(2)}>Yes</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Return Reason</h2>

                <textarea
                  placeholder="Enter reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />

                <div className="modal-actions">
                  <button onClick={() => setShowModal(false)}>Cancel</button>

                  <button disabled={!reason.trim()} onClick={submitReturn}>
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default History;
