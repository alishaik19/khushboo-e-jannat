const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// DB CONNECT
const connectDB = require("./config/db");

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());

// ========================
// CORS CONFIG (FIXED)
// ========================
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
  }),
);

// ========================
// STATIC FILES
// ========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================
// ROUTES
// ========================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// ========================
// HOME ROUTE
// ========================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ========================
// START SERVER
// ========================
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
};

startServer();
