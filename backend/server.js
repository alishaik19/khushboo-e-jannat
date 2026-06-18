const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ========================
// DB CONNECT
// ========================
const connectDB = require("./config/db");

// ========================
// MIDDLEWARE
// ========================

// JSON middleware
app.use(express.json());

// ========================
// STATIC FILES (UPLOADS)
// ========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================
// CORS (PRODUCTION FIXED)
// ========================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://khushboo-e-jannat.vercel.app",
  "https://khushboo-e-jannat-official.vercel.app",
];

// remove trailing slash issues
const normalize = (url) => url?.replace(/\/$/, "");

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman
      if (!origin) return callback(null, true);

      const cleanOrigin = normalize(origin);

      const isAllowed = allowedOrigins.some(
        (o) => normalize(o) === cleanOrigin
      );

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(null, false); // safe production behavior
    },
    credentials: true,
  })
);

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