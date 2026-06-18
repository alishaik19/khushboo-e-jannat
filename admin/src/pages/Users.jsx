import { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
const API_URL = import.meta.env.VITE_API_URL;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // 📦 FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/users`);

      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑 OPEN CONFIRM MODAL
  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  // 🗑 DELETE USER
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/users/${selectedUserId}`);

      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));

      setShowConfirm(false);
      setSelectedUserId(null);
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <div>
      <h2 className="page-title">Users</h2>

      <div className="card-box">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDelete(u._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Are you sure?</h3>
            <p>This user will be permanently deleted.</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedUserId(null);
                }}
              >
                Cancel
              </button>

              <button className="delete-btn" onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
