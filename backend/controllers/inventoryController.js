const Product = require("../models/Product");

// GET /api/inventory - paginated, searchable, filterable, sortable list
async function getInventory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "-lastUpdated";

    const filter = {};

    if (search) {
      filter.productName = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    const totalRecords = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      totalRecords,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong fetching inventory", error: err.message });
  }
}

// POST /api/inventory - create a new product
async function createProduct(req, res) {
  try {
    const { price, cost, stockQuantity } = req.body;

    if (price < cost) {
      return res.status(400).json({ message: "Price cannot be lower than cost" });
    }
    if (stockQuantity < 0) {
      return res.status(400).json({ message: "Stock quantity cannot be negative" });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Could not create product", error: err.message });
  }
}

// PUT /api/inventory/:id - update a product
async function updateProduct(req, res) {
  try {
    const { price, cost, stockQuantity } = req.body;

    if (price !== undefined && cost !== undefined && price < cost) {
      return res.status(400).json({ message: "Price cannot be lower than cost" });
    }
    if (stockQuantity !== undefined && stockQuantity < 0) {
      return res.status(400).json({ message: "Stock quantity cannot be negative" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Could not update product", error: err.message });
  }
}

module.exports = { getInventory, createProduct, updateProduct };
