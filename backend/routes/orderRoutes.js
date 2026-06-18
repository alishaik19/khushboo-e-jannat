const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middlewares/auth");

// ==========================
// ADMIN MIDDLEWARE
// ==========================
const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};

// ==========================
// CREATE ORDER (USER ONLY)
// ==========================
router.post("/save", auth, async (req, res) => {
  try {
    const { items, totalAmount, paymentId, shippingDetails } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const formattedItems = items.map((item) => ({
      name: item.name,
      price:
        typeof item.price === "number"
          ? item.price
          : Number(item.price?.toString().replace("₹", "")),
      qty: item.qty,
      image: item.image || item.img,
    }));

    const order = await Order.create({
      userId: req.user.id, // 🔥 IMPORTANT
      items: formattedItems,
      totalAmount,
      paymentId,
      shippingDetails,
    });

    res.status(201).json(order);
  } catch (error) {
    console.log("ORDER SAVE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// GET USER ORDERS ONLY
// ==========================
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.log("GET USER ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
router.get("/admin/history", auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Delivered", "Cancelled"] },
      adminHidden: false,
    })
      .populate("userId", "name email")
      .sort({ updatedAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/admin/history/:id/hide", auth, adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        adminHidden: true,
      },
      {
        new: true,
      },
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// ADMIN: GET ALL ORDERS
// ==========================
router.get("/admin/all", auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      status: {
        $nin: [
          "Delivered",
          "Cancelled",
          "Return Requested",
          "Return Processing",
          "Returned",
          "Return Rejected",
        ],
      },
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log("ADMIN ALL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
// ==========================
// UPDATE ORDER STATUS
// ==========================
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔥 SAFE USER CHECK
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const userId = order.userId ? order.userId.toString() : null;

    const isAdmin = req.user.role === "admin";
    const isOwner = userId === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Not allowed" });
    }

    order.status = status;

    await order.save();

    return res.json({
      message: "Status updated successfully",
      order,
    });
  } catch (error) {
    console.log("🔥 STATUS ERROR FULL:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});
// ==========================
// DELETE ORDER
// ==========================
router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await order.deleteOne();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log("DELETE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
// ==========================
// RETURN ORDER (USER ONLY)
// ==========================
router.post("/return/:id", auth, async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    order.status = "Return Requested";
    order.returnReason = reason;

    await order.save();

    res.json({
      message: "Return requested successfully",
      order,
    });
  } catch (err) {
    console.log("RETURN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/admin/returns", auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      status: {
        $in: ["Return Requested"],
      },
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/admin/return-history", auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      status: {
        $in: ["Return Processing", "Returned", "Return Rejected"],
      },
      adminHidden: false,
    })
      .populate("userId", "name email")
      .sort({ updatedAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
