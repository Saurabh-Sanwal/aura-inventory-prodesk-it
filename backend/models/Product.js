const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  reorderLevel: {
    type: Number,
    default: 20,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// indexes so search stays fast even with 50,000 products
productSchema.index({ sku: 1 });
productSchema.index({ category: 1 });
productSchema.index({ productName: "text" });

module.exports = mongoose.model("Product", productSchema);
