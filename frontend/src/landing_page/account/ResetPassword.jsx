import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.css";
const API_URL = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ rules
  const rules = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const isStrong = Object.values(rules).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrong) return toast.error("Password not strong enough");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await axios.post(`${API_URL}/api/auth/reset-password/${token}`, {
        password,
      });

      toast.success("Password updated successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* LIVE RULES */}
          <div className="password-rules">
            <p className={rules.length ? "valid" : "invalid"}>
              {rules.length ? "✔" : "✖"} At least 8 characters
            </p>

            <p className={rules.lower ? "valid" : "invalid"}>
              {rules.lower ? "✔" : "✖"} One lowercase letter
            </p>

            <p className={rules.upper ? "valid" : "invalid"}>
              {rules.upper ? "✔" : "✖"} One uppercase letter
            </p>

            <p className={rules.number ? "valid" : "invalid"}>
              {rules.number ? "✔" : "✖"} One number
            </p>

            <p className={rules.special ? "valid" : "invalid"}>
              {rules.special ? "✔" : "✖"} One special character
            </p>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {confirmPassword && (
            <p className={password === confirmPassword ? "valid" : "invalid"}>
              {password === confirmPassword
                ? "✔ Passwords match"
                : "✖ Passwords do not match"}
            </p>
          )}

          <button type="submit" disabled={!isStrong}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
