const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const auth = require("../middlewares/auth");

// ===============================
// 📁 MULTER CONFIG
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ===============================
// 📦 GET ALL PRODUCTS
// ===============================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// ➕ ADD PRODUCT (ADMIN ONLY IDEA)
// ===============================
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, status, category } = req.body;

    if (!name || !price || !req.file) {
      return res.status(400).json({
        message: "Name, price and image are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      status,
      category,
      image: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
    });

    res.status(201).json(product);
  } catch (err) {
    console.log("PRODUCT CREATE ERROR =>", err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// ✏️ UPDATE PRODUCT
// ===============================
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      category: req.body.category,
    };

    if (req.file) {
      updateData.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// ❌ DELETE PRODUCT
// ===============================
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) return res.json([]);

    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
