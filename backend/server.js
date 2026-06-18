const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// DB CONNECT
const connectDB = require("./config/db");

// MIDDLEWARE
app.use(express.json());

// ✅ CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  }),
);

// STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// HOME
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// START SERVER
const startServer = async () => {
  console.log(process.env.FRONTEND_URL);
  console.log(process.env.ADMIN_URL);
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
};

startServer();
