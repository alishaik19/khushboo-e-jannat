const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// DASHBOARD STATS
router.get("/stats", async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();

    const activeOrders = await Order.countDocuments({
      status: {
        $in: ["Placed", "Processing", "Shipped"],
      },
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      status: "Cancelled",
    });

    const outOfStockProducts = await Product.countDocuments({
      status: "Out of Stock",
    });

    const revenueData = await Order.find({
      status: "Delivered",
    });

    const revenue = revenueData.reduce(
      (total, order) => total + (order.totalAmount || 0),
      0,
    );

    res.json({
      products,
      users,
      orders,
      revenue,
      activeOrders,
      deliveredOrders,
      cancelledOrders,
      outOfStockProducts,
    });
  } catch (err) {
    console.log("DASHBOARD ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
