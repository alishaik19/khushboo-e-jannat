import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================
  // LIVE VALIDATION RULES
  // ======================
  const rules = {
    name: form.name.trim().length >= 3,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    length: form.password.length >= 8,
    lower: /[a-z]/.test(form.password),
    upper: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[@$!%*?&]/.test(form.password),
  };

  const isFormValid = Object.values(rules).every(Boolean);

  // ======================
  // HANDLE CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/register`, form);

      alert("Account Created 🎉");
      navigate("/login");

      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p>Join us and start shopping 🛍️</p>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <p className={rules.name ? "valid" : "invalid"}>
            ✓ Name must be at least 3 characters
          </p>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          <p className={rules.email ? "valid" : "invalid"}>
            ✓ Enter valid email
          </p>

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="password-rules">
            <p className={rules.length ? "valid" : "invalid"}>
              ✓ At least 8 characters
            </p>

            <p className={rules.lower ? "valid" : "invalid"}>
              ✓ One lowercase letter
            </p>

            <p className={rules.upper ? "valid" : "invalid"}>
              ✓ One uppercase letter
            </p>

            <p className={rules.number ? "valid" : "invalid"}>✓ One number</p>

            <p className={rules.special ? "valid" : "invalid"}>
              ✓ One special character (@$!%*?&)
            </p>
          </div>

          <button type="submit" disabled={!isFormValid || loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
