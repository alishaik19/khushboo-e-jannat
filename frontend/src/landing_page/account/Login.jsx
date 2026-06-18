import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);

      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user?.id) {
        localStorage.setItem("userId", user.id);
      }

      localStorage.setItem("activeUser", user.id);

      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials ❌");
    } finally {
      setLoading(false);
      setForm({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to continue shopping 🛒</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div
            style={{
              textAlign: "right",
              marginBottom: "15px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: "#c89b3c",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
