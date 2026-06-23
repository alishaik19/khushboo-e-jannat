import "./History.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function History() {
  const [historyOrders, setHistoryOrders] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = res.data.filter((order) =>
        [
          "Delivered",
          "Cancelled",
          "Return Requested",
          "Return Processing",
          "Returned",
          "Return Rejected",
        ].includes(order.status),
      );

      setHistoryOrders(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const openReturnModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setStep(1);
    setReason("");
  };

  const submitReturn = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/orders/return/${selectedOrder._id}`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setHistoryOrders((prev) =>
        prev.map((o) =>
          o._id === selectedOrder._id
            ? { ...o, status: "Return Requested" }
            : o,
        ),
      );

      setShowModal(false);
      setSelectedOrder(null);
      setReason("");
      setStep(1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="history-section">
      <div className="history-container">
        <h2 className="history-title">Order History</h2>

        {historyOrders.length === 0 ? (
          <p className="history-empty">No Order History 📦</p>
        ) : (
          <div className="history-table-wrapper">
            <table className="history-table">
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
                {historyOrders.map((order) => {
                  const dateObj = new Date(order.createdAt);

                  return (
                    <tr key={order._id}>
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

                      <td>
                        {order.items.map((item, i) => (
                          <div key={i} className="table-item">
                            {item.name} × {item.qty}
                          </div>
                        ))}
                      </td>

                      <td>₹{order.totalAmount}</td>

                      <td>
                        <span
                          className={`status ${order.status
                            .replace(/\s/g, "")
                            .toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        {order.status === "Delivered" ? (
                          <button
                            className="return-btn"
                            onClick={() => openReturnModal(order)}
                          >
                            Return
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
        <div className="modal-overlay">
          <div className="modal-box">
            {step === 1 ? (
              <>
                <h2>Are you sure?</h2>
                <p>Do you want to return this order?</p>

                <div className="modal-actions">
                  <button onClick={() => setShowModal(false)}>No</button>
                  <button onClick={() => setStep(2)}>Yes</button>
                </div>
              </>
            ) : (
              <>
                <h2>Return Reason</h2>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason..."
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
