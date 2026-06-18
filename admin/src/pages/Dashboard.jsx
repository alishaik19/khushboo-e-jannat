import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,

    activeOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    outOfStockProducts: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      <div className="row g-4">
        {/* Products */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaBox size={30} />
            <h4>{stats.products}</h4>
            <p>Products</p>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaShoppingCart size={30} />
            <h4>{stats.orders}</h4>
            <p>Orders</p>
          </div>
        </div>

        {/* Users */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaUsers size={30} />
            <h4>{stats.users}</h4>
            <p>Users</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaRupeeSign size={30} />
            <h4>₹{stats.revenue}</h4>
            <p>Revenue</p>
          </div>
        </div>

        {/* Active Orders */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaTruck size={30} />
            <h4>{stats.activeOrders}</h4>
            <p>Active Orders</p>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaCheckCircle size={30} />
            <h4>{stats.deliveredOrders}</h4>
            <p>Delivered Orders</p>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaTimesCircle size={30} />
            <h4>{stats.cancelledOrders}</h4>
            <p>Cancelled Orders</p>
          </div>
        </div>

        {/* Out Of Stock */}
        <div className="col-md-3">
          <div className="card-box text-center">
            <FaExclamationTriangle size={30} />
            <h4>{stats.outOfStockProducts}</h4>
            <p>Out Of Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
