import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

      <NavLink to="/admin" end className="nav-item">
        Dashboard
      </NavLink>

      <NavLink to="/admin/products" className="nav-item">
        Products
      </NavLink>

      <NavLink to="/admin/orders" className="nav-item">
        Orders
      </NavLink>

      <NavLink to="/admin/users" className="nav-item">
        Users
      </NavLink>

      {/* ✅ SEPARATE HISTORY */}
      <NavLink to="/admin/history" className="nav-item">
        Order History
      </NavLink>

      {/* 🔥 NEW: RETURN ORDERS */}
      <NavLink to="/admin/returns" className="nav-item">
        Return Orders
      </NavLink>
      <NavLink to="/admin/return-history" className="nav-item">
        Return History
      </NavLink>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
