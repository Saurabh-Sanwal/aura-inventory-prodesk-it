const Product = require("../models/Product");

// GET /api/analytics - totals, low stock list, category breakdown
async function getAnalytics(req, res) {
  try {
    const totalSKUs = await Product.countDocuments();
    const outOfStock = await Product.countDocuments({ stockQuantity: 0 });

    const totalValueResult = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$stockQuantity"] } },
        },
      },
    ]);
    const totalValue = totalValueResult[0]?.totalValue || 0;

    const lowStock = await Product.find()
      .sort({ stockQuantity: 1 })
      .limit(10)
      .select("productName stockQuantity");

    const categoryBreakdown = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalValue: { $sum: { $multiply: ["$price", "$stockQuantity"] } },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalValue: -1 } },
      {
        $project: {
          category: "$_id",
          totalValue: 1,
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      totalSKUs,
      outOfStock,
      totalValue,
      lowStock,
      categoryBreakdown,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong fetching analytics", error: err.message });
  }
}

module.exports = { getAnalytics };
