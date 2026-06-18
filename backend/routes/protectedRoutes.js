const verifyAdmin = require("../middlewares/verifyAdmin");

// protected route
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      image: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
