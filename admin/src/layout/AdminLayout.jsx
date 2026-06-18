import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./Admin.css";

function AdminLayout() {
  return (
    <div className="admin-container">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
