import "./Profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // =========================
  // USER STATE
  // =========================
  const [user, setUser] = useState({
    name: storedUser?.name || "User",
    email: storedUser?.email || "",
    role: storedUser?.role || "Customer",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  // =========================
  // ADDRESS STATE
  // =========================
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("address")) || {
      fullName: "",
      phone: "",
      city: "",
      pincode: "",
      fullAddress: "",
    },
  );

  const [errors, setErrors] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);

  // =========================
  // VALIDATION (REAL WORLD)
  // =========================
  const validateAddress = () => {
    const newErrors = {};

    if (!address.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(address.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    if (!address.fullAddress || address.fullAddress.trim().length < 10) {
      newErrors.fullAddress = "Address must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // USER CHANGE
  // =========================
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // =========================
  // ADDRESS SAVE (WITH VALIDATION)
  // =========================
  const handleAddressSave = () => {
    if (!validateAddress()) return;

    localStorage.setItem("address", JSON.stringify(address));
    setShowAddressModal(false);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="profile-container">
      {/* LEFT PROFILE */}
      <div className="profile-card">
        <img src={user.img} alt="profile" className="profile-img" />

        <h2>
          {isEditing ? (
            <input name="name" value={user.name} onChange={handleChange} />
          ) : (
            user.name
          )}
        </h2>

        <p className="role">{user.role}</p>
        <p className="email">📧 {user.email}</p>

        {/* SAVED ADDRESS */}
        {address.fullAddress && (
          <div className="saved-address">
            <h4>🏠 Saved Address</h4>
            <p>{address.fullName}</p>
            <p>{address.phone}</p>
            <p>
              {address.city} - {address.pincode}
            </p>
            <p>{address.fullAddress}</p>
          </div>
        )}

        <div className="btn-group">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          ) : (
            <button onClick={handleSave}>Save Changes</button>
          )}

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="profile-dashboard">
        <div className="quick-actions">
          <button onClick={() => navigate("/orders")}>📦 My Orders</button>
          <button onClick={() => navigate("/cart")}>🛒 My Cart</button>
          <button onClick={() => navigate("/history")}>📜 History</button>
          <button onClick={() => setShowAddressModal(true)}>
            🏠 Manage Address
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="address-modal">
            <h2>Save Address</h2>

            <input
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}

            <input
              placeholder="Phone"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            {errors.city && <p className="error">{errors.city}</p>}

            <input
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
            {errors.pincode && <p className="error">{errors.pincode}</p>}

            <textarea
              placeholder="Full Address (min 10 chars)"
              value={address.fullAddress}
              onChange={(e) =>
                setAddress({ ...address, fullAddress: e.target.value })
              }
            />
            {errors.fullAddress && (
              <p className="error">{errors.fullAddress}</p>
            )}

            <div className="modal-buttons">
              <button onClick={() => setShowAddressModal(false)}>Cancel</button>

              <button onClick={handleAddressSave}>Save Address</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
